// @ts-ignore
import {setup} from "./System/core/setup";
import * as http from "http";
import express, * as Express from "express";
import Logger from "./System/core/Logger";
import {
    Add_ActiveRadioUser,
    CommunityData,
    Create_RadioProfile, Get_ActiveChannel_Users,
    Get_RadioChannels,
    Get_RadioUser,
    Int_Config,
    is_APIKey, Rem_ActiveRadioUser, Rem_TEMPRadioChannels
} from "./System/DS";
import {Assign_RadioUserChannel, Kick_RadioUser, MakeChannel, MakeTempChannel, Send_Embeded} from "./System/Net";
import {
    Emb_ClientReporting,
    Emb_GeneralNotice,
    Emb_NewChannel,
    Emb_NewTempChannel,
    Emb_SecurityError
} from "./System/core/Discord_Emb";
export const https = require('https');
export const app = express();
export const logger = new Logger("[Lucifer Systems]");
export const httpServer = http.createServer({}, app);


////INT THE SERVER////
setup();
/////////////////////


const io = require('socket.io')(httpServer, {pingTimeout: 60000, allowEIO3: true, origin: "*",
    methods: ["GET", "POST", "OPTIONS"], transports: ['websocket', 'polling', 'flashsocket']});


//THIS DYNAMIC NAMESPACE WILL BE USED FOR VOICE COMS AND TRAFIC OF CLIENT TO CLIENT ON THE SAME SPACE
const RadioCOMS = io.of(/^\/dynamic-\d+$/).on('connect', (socket:any) => {
    let isAUTHORIZED = false;
    let ns = socket.nsp;
    let newNamespace = socket.nsp.name.toString(); // newNamespace.name === '/dynamic-101'
    let Channel_ID = newNamespace.replace("/dynamic-", "");
    let DiscID: any = null;


    logger.warn("Connection request for Namespace: "+ Channel_ID);

    if(parseInt(Channel_ID) == 6666666666666 || CommunityData[0][1].indexOf(parseInt(Channel_ID)) <= -1 && CommunityData[4].indexOf(parseInt(Channel_ID)) <= -1){
        if(parseInt(Channel_ID) == 6666666666666){
            //DEAD SPACE
            logger.info("Socket connected too dead space -- Waiting for channel selection");
        }else{
            logger.warn("Disconnected Client on Unrecognized NS");
            socket.disconnect();
        }
    }else{
        socket.on("PTT", function (data:any){
            ns.emit("PTT", data);
        });

        socket.on("vc_packet", function (data:any){
            logger.info("VC SENDING PACKET IN: "+ newNamespace);
            io.of('/dynamic-00000000').emit("vc_packet", socket.id, data);
            ns.emit("vc_packet", socket.id, data);
        });

        socket.on("Net_Add", function (data:any){
            let d = data[0];
            DiscID = d.DiscordID;
            Create_RadioProfile(d.DiscordID);
            Add_ActiveRadioUser(String(d.DiscordID), parseInt(Channel_ID));
            let res = Get_ActiveChannel_Users(Channel_ID);
            var d2 = [{
                DiscordID: String(d.DiscordID),
                data: res
            }];
            logger.info("SENDING PLAYERLIST UPDATE TOO: "+ d.DiscordID);
            logger.info(String(res));
            RadioNet.emit("PlayerList_Update", d2);
        });

        socket.on("PlayerList_Update", function (data:any){
            let d = data[0];
            let res = Get_ActiveChannel_Users(Channel_ID)[1];
            socket.emit("PlayerList_Update", res);
        });

        socket.on("priority_active", function (data:any){
            logger.info("Priority Active IN: "+newNamespace);
            ns.emit("Trigger_Priority");
        });

        socket.on("disconnect", () => {
            logger.info("CONN DROPPED");
            Rem_ActiveRadioUser(String(DiscID), parseInt(Channel_ID));
        });
    }
})

//USED FOR MASS NETWORK COMMUNICATIONS OR UPDATES REGARDING CHANNELS
export const RadioNet = io.of("/com").on("connection", (socket:any)=> {
    let IsAuthenticated = false;
    socket.on("Auth", function (data:any){
        let d = data[0];
        if(is_APIKey(d.key)){
            //Make New Discord Profile for user
            Create_RadioProfile(d.DiscordID);
            IsAuthenticated = true;
            let rr = Get_RadioChannels(d.CurrJob);
            if(rr.length <= 0){
                rr = Get_RadioChannels("Default");
            }
            var resp = [{
                // @ts-ignore
                CommunityName: Int_Config.CommunityName,
                Channels: rr
            }];
            socket.emit("Auth_Success", resp);
        }else{
            var res = [{
                message: "BAD AUTH"
            }];
            socket.emit("Auth_Err", res);
        }
    });
    socket.on("Create_TempCh", function (data:any){
        let d = data[0];
        if(d.DiscordID === null || String(d.DiscordID).includes(String(""))){
            socket.emit("Error", "E01");
        }else{
            if(CommunityData[2][0].indexOf(String(d.DiscordID)) <= -1){
                var chid = MakeTempChannel(String(d.channelName), "TEMP");
                var d1 = [{
                    ChannelName: String(d.channelName),
                    ChannelID: chid
                }];

                CommunityData[2][0].push(String(d.DiscordID));
                CommunityData[2][1].push(d1);
            }else{
                Kick_RadioUser(String(d.DiscordID));
                Rem_TEMPRadioChannels(CommunityData[0][1].indexOf(parseInt(CommunityData[2][1][CommunityData[2][0].indexOf(String(d.DiscordID))].ChannelID)));
                CommunityData[2][1].splice(CommunityData[2][0].indexOf(String(d.DiscordID)), 1);
                CommunityData[2][0].splice(CommunityData[2][0].indexOf(String(d.DiscordID)), 1);
                var chid = MakeTempChannel(String(d.channelName), "TEMP");
                var d1 = [{
                    ChannelName: String(d.channelName),
                    ChannelID: chid
                }];

                CommunityData[2][0].push(String(d.DiscordID));
                CommunityData[2][1].push(d);
            }
        }
    });

    socket.on("Create_PermCh", function (data:any){
        let d = data[0];
        if(d.DiscordID === null || String(d.DiscordID).includes(String(""))){
            socket.emit("Error", "E01");
        }else{
            if(CommunityData[1][0].indexOf(d.DiscordID) >= 0 || String(d.DiscordID).includes("662529839332327424")) {
                MakeChannel(String(d.channelName), String(d.Job));
            }else{
                socket.emit("Error", "E02");
            }
        }
    });

    socket.on("CH_GET", function (data:any){
       let r = data[0];
       if(r.DiscordID == null || r.DiscordID == ""){
           socket.emit("Error", "E01");
       }else{
           let j = r.Job;
           logger.info(String(r.DiscordID) + " Requesting Channels for Job: "+ r.Job);
           let rr = Get_RadioChannels(j);
           if(Get_RadioChannels.length <= 0){
               rr = Get_RadioChannels("Default");
           }
           var resp = [{
               // @ts-ignore
               CommunityName: Int_Config.CommunityName,
               Channels: rr
           }];
           socket.emit("CH_UPDATE", resp);
       }
    });

    socket.on("EH", function (data:any){
        let r = data[0];
        // @ts-ignore
        Send_Embeded(Emb_ClientReporting(String(JSON.stringify(r)), r.DiscordID), Int_Config.LogChannel);
    });

    socket.on("JTC", function (data:any){
        let req = data[0];
        let Self_DiscordID = req.DiscordID;
        let Selected_DiscordID = req.ODiscordID;
        let Selected_DiscordName = req.OName;

        if(CommunityData[4].indexOf(parseInt(Selected_DiscordID)) <= -1){
            CommunityData[4].push(parseInt(Selected_DiscordID));
            let temp_obj = [{
                ChannelID: parseInt(Selected_DiscordID),
                ChannelName: "JTC: "+ Selected_DiscordName
            }];
            Assign_RadioUserChannel(Self_DiscordID, temp_obj[0]);
        }else{
            let temp_obj = [{
                ChannelID: parseInt(Selected_DiscordID),
                ChannelName: "JTC: "+ Selected_DiscordName
            }];
            Assign_RadioUserChannel(Self_DiscordID, temp_obj[0]);
        }

    });

    socket.on("Sel_UserAlrt", function (data:any){
       RadioNet.emit("Selected_PLALRT", data);
    });

    socket.on("SJTC", function (data:any){
        let req = data[0];
        let Self_DiscordID = req.DiscordID;

        if(CommunityData[4].indexOf(parseInt(Self_DiscordID)) <= -1){
            CommunityData[4].push(parseInt(Self_DiscordID));
            let temp_obj = [{
                ChannelID: parseInt(Self_DiscordID),
                ChannelName: "JTC SELF"
            }];
            Assign_RadioUserChannel(Self_DiscordID, temp_obj[0]);
        }else{
            let temp_obj = [{
                ChannelID: parseInt(Self_DiscordID),
                ChannelName: "JTC SELF"
            }];
            Assign_RadioUserChannel(Self_DiscordID, temp_obj[0]);
        }
    });

    socket.on("priority_active", function (data:any){
        logger.info("Priority Active IN: "+data[0].ChannelID);
        RadioNet.emit("Trigger_Priority");
    });
});




//API CONN////////////
let sys_route = require("./API/sys");
let scripts_route = require("./API/scripts");
let sounds_route = require("./API/sounds");
app.use('/api/', sys_route);
app.use('/scripts/', scripts_route);
app.use('/sounds/', sounds_route);
//////////