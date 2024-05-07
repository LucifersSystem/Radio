"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioNet = exports.httpServer = exports.logger = exports.app = exports.https = void 0;
// @ts-ignore
var setup_1 = require("./System/core/setup");
var http = __importStar(require("http"));
var express_1 = __importDefault(require("express"));
var Logger_1 = __importDefault(require("./System/core/Logger"));
var DS_1 = require("./System/DS");
var Net_1 = require("./System/Net");
var Discord_Emb_1 = require("./System/core/Discord_Emb");
exports.https = require('https');
exports.app = (0, express_1.default)();
exports.logger = new Logger_1.default("[Lucifer Systems]");
exports.httpServer = http.createServer({}, exports.app);
////INT THE SERVER////
(0, setup_1.setup)();
/////////////////////
var io = require('socket.io')(exports.httpServer, { pingTimeout: 60000, allowEIO3: true, origin: "*",
    methods: ["GET", "POST", "OPTIONS"], transports: ['websocket', 'polling', 'flashsocket'] });
//THIS DYNAMIC NAMESPACE WILL BE USED FOR VOICE COMS AND TRAFIC OF CLIENT TO CLIENT ON THE SAME SPACE
var RadioCOMS = io.of(/^\/dynamic-\d+$/).on('connect', function (socket) {
    var isAUTHORIZED = false;
    var ns = socket.nsp;
    var newNamespace = socket.nsp.name.toString(); // newNamespace.name === '/dynamic-101'
    var Channel_ID = newNamespace.replace("/dynamic-", "");
    var DiscID = null;
    exports.logger.warn("Connection request for Namespace: " + Channel_ID);
    if (parseInt(Channel_ID) == 6666666666666 || DS_1.CommunityData[0][1].indexOf(parseInt(Channel_ID)) <= -1 && DS_1.CommunityData[4].indexOf(parseInt(Channel_ID)) <= -1) {
        if (parseInt(Channel_ID) == 6666666666666) {
            //DEAD SPACE
            exports.logger.info("Socket connected too dead space -- Waiting for channel selection");
        }
        else {
            exports.logger.warn("Disconnected Client on Unrecognized NS");
            socket.disconnect();
        }
    }
    else {
        socket.on("PTT", function (data) {
            ns.emit("PTT", data);
        });
        socket.on("vc_packet", function (data) {
            exports.logger.info("VC SENDING PACKET IN: " + newNamespace);
            io.of('/dynamic-00000000').emit("vc_packet", socket.id, data);
            ns.emit("vc_packet", socket.id, data);
        });
        socket.on("Net_Add", function (data) {
            var d = data[0];
            DiscID = d.DiscordID;
            (0, DS_1.Create_RadioProfile)(d.DiscordID);
            (0, DS_1.Add_ActiveRadioUser)(String(d.DiscordID), parseInt(Channel_ID));
            var res = (0, DS_1.Get_ActiveChannel_Users)(Channel_ID);
            var d2 = [{
                    DiscordID: String(d.DiscordID),
                    data: res
                }];
            exports.logger.info("SENDING PLAYERLIST UPDATE TOO: " + d.DiscordID);
            exports.logger.info(String(res));
            exports.RadioNet.emit("PlayerList_Update", d2);
        });
        socket.on("PlayerList_Update", function (data) {
            var d = data[0];
            var res = (0, DS_1.Get_ActiveChannel_Users)(Channel_ID)[1];
            socket.emit("PlayerList_Update", res);
        });
        socket.on("priority_active", function (data) {
            exports.logger.info("Priority Active IN: " + newNamespace);
            ns.emit("Trigger_Priority");
        });
        socket.on("disconnect", function () {
            exports.logger.info("CONN DROPPED");
            (0, DS_1.Rem_ActiveRadioUser)(String(DiscID), parseInt(Channel_ID));
        });
    }
});
//USED FOR MASS NETWORK COMMUNICATIONS OR UPDATES REGARDING CHANNELS
exports.RadioNet = io.of("/com").on("connection", function (socket) {
    var IsAuthenticated = false;
    socket.on("Auth", function (data) {
        var d = data[0];
        if ((0, DS_1.is_APIKey)(d.key)) {
            //Make New Discord Profile for user
            (0, DS_1.Create_RadioProfile)(d.DiscordID);
            IsAuthenticated = true;
            var rr = (0, DS_1.Get_RadioChannels)(d.CurrJob);
            if (rr.length <= 0) {
                rr = (0, DS_1.Get_RadioChannels)("Default");
            }
            var resp = [{
                    // @ts-ignore
                    CommunityName: DS_1.Int_Config.CommunityName,
                    Channels: rr
                }];
            socket.emit("Auth_Success", resp);
        }
        else {
            var res = [{
                    message: "BAD AUTH"
                }];
            socket.emit("Auth_Err", res);
        }
    });
    socket.on("CH_GET", function (data) {
        var r = data[0];
        if (r.DiscordID == null || r.DiscordID == "") {
            socket.emit("Error", "E01");
        }
        else {
            var j = r.Job;
            exports.logger.info(String(r.DiscordID) + " Requesting Channels for Job: " + r.Job);
            var rr = (0, DS_1.Get_RadioChannels)(j);
            if (DS_1.Get_RadioChannels.length <= 0) {
                rr = (0, DS_1.Get_RadioChannels)("Default");
            }
            var resp = [{
                    // @ts-ignore
                    CommunityName: DS_1.Int_Config.CommunityName,
                    Channels: rr
                }];
            socket.emit("CH_UPDATE", resp);
        }
    });
    socket.on("EH", function (data) {
        var r = data[0];
        // @ts-ignore
        (0, Net_1.Send_Embeded)((0, Discord_Emb_1.Emb_ClientReporting)(String(JSON.stringify(r)), r.DiscordID), DS_1.Int_Config.LogChannel);
    });
    socket.on("JTC", function (data) {
        var req = data[0];
        var Self_DiscordID = req.DiscordID;
        var Selected_DiscordID = req.ODiscordID;
        var Selected_DiscordName = req.OName;
        if (DS_1.CommunityData[4].indexOf(parseInt(Selected_DiscordID)) <= -1) {
            DS_1.CommunityData[4].push(parseInt(Selected_DiscordID));
            var temp_obj = [{
                    ChannelID: parseInt(Selected_DiscordID),
                    ChannelName: "JTC: " + Selected_DiscordName
                }];
            (0, Net_1.Assign_RadioUserChannel)(Self_DiscordID, temp_obj[0]);
        }
        else {
            var temp_obj = [{
                    ChannelID: parseInt(Selected_DiscordID),
                    ChannelName: "JTC: " + Selected_DiscordName
                }];
            (0, Net_1.Assign_RadioUserChannel)(Self_DiscordID, temp_obj[0]);
        }
    });
    socket.on("Sel_UserAlrt", function (data) {
        exports.RadioNet.emit("Selected_PLALRT", data);
    });
    socket.on("SJTC", function (data) {
        var req = data[0];
        var Self_DiscordID = req.DiscordID;
        if (DS_1.CommunityData[4].indexOf(parseInt(Self_DiscordID)) <= -1) {
            DS_1.CommunityData[4].push(parseInt(Self_DiscordID));
            var temp_obj = [{
                    ChannelID: parseInt(Self_DiscordID),
                    ChannelName: "JTC SELF"
                }];
            (0, Net_1.Assign_RadioUserChannel)(Self_DiscordID, temp_obj[0]);
        }
        else {
            var temp_obj = [{
                    ChannelID: parseInt(Self_DiscordID),
                    ChannelName: "JTC SELF"
                }];
            (0, Net_1.Assign_RadioUserChannel)(Self_DiscordID, temp_obj[0]);
        }
    });
    socket.on("priority_active", function (data) {
        exports.logger.info("Priority Active IN: " + data[0].ChannelID);
        exports.RadioNet.emit("Trigger_Priority");
    });
});
//API CONN////////////
var sys_route = require("./API/sys");
var scripts_route = require("./API/scripts");
var sounds_route = require("./API/sounds");
exports.app.use('/api/', sys_route);
exports.app.use('/scripts/', scripts_route);
exports.app.use('/sounds/', sounds_route);
//////////
