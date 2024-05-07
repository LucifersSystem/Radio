"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_RadioProfile = exports.is_APIKey = exports.Update_Config = exports.Del_Message = exports.Get_Messages = exports.Add_Message = exports.Rem_ActiveRadioUser = exports.Add_ActiveRadioUser = exports.Get_ActiveChannel_Users = exports.Add_RadioChannels = exports.Get_RadioChannels = exports.Rem_TEMPRadioChannels = exports.Rem_RadioChannels = exports.Is_AuthorizedUser = exports.Add_AuthorizedUser = exports.Get_RadioUser = exports.Add_RadioUser = exports.Export_CommunityData = exports.Import_CommunityData = exports.CommunityData = exports.Int_Config = void 0;
var Logger_1 = __importDefault(require("./core/Logger"));
var index_1 = require("../index");
var Net_1 = require("./Net");
var database_1 = require("./core/database");
var Log = new Logger_1.default("[DATA STRUCTURES]");
exports.Int_Config = null; //CURRENT CONFIG
exports.CommunityData = new Array();
function Import_CommunityData(data) {
    try {
        var json = JSON.parse(data);
        for (var p = 0; p <= json[0].mods.length - 1; p++) {
            Add_AuthorizedUser(json[0].mods[p]);
        }
    }
    catch (err) {
        Log.error("Got Error Importing Community Data..");
        Log.error(String(err));
        process.exit(1);
    }
}
exports.Import_CommunityData = Import_CommunityData;
function Export_CommunityData() {
    try {
        var temp_stor1 = new Array();
        var temp_stor2 = new Array();
        for (var x = 0; x <= exports.CommunityData[1][1][0].length - 1; x++) {
            var profile = [{
                    DiscordID: exports.CommunityData[1][1][0][x],
                    data: exports.CommunityData[1][1][1][x]
                }];
            temp_stor1.push(profile);
        }
        for (var i = 0; i <= exports.CommunityData[1][0].length - 1; i++) {
            temp_stor2.push(exports.CommunityData[1][0][i]);
        }
        var d = [{
                mods: temp_stor2
            }];
        return JSON.stringify(d);
    }
    catch (err) {
        Log.error("Got Error Exporting Community Data..");
        Log.error(String(err));
        process.exit(1);
    }
}
exports.Export_CommunityData = Export_CommunityData;
function Add_RadioUser(DiscordID, Data) {
    try {
        if (exports.CommunityData[1][1][0].indexOf(DiscordID) <= -1) {
            //USER DOSNT EXIST
            exports.CommunityData[1][1][0].push(DiscordID);
            exports.CommunityData[1][1][1].push(Data);
            Log.success("Created User Obj: " + Data);
            return true;
        }
        else {
            //USER DOSE EXIST
            return false;
        }
    }
    catch (err) {
        return null;
    }
}
exports.Add_RadioUser = Add_RadioUser;
function Get_RadioUser(DiscordID) {
    try {
        if (exports.CommunityData[1][1][0].indexOf(DiscordID) <= -1) {
            //USER DOSNT EXIST
            return false;
        }
        else {
            //USER DOSE EXIST
            return exports.CommunityData[1][1][1][exports.CommunityData[1][1][0].indexOf(DiscordID)];
        }
    }
    catch (err) {
        return null;
    }
}
exports.Get_RadioUser = Get_RadioUser;
function Add_AuthorizedUser(DiscordID) {
    try {
        if (exports.CommunityData[1][0].indexOf(DiscordID) <= -1) {
            //USER DOSNT EXIST
            Log.success("CREATED AUTHORIZED USER: " + DiscordID);
            exports.CommunityData[1][0].push(DiscordID);
            return true;
        }
        else {
            //USER DOSE EXIST
            console.log(exports.CommunityData[1][0].indexOf(DiscordID));
            return false;
        }
    }
    catch (err) {
        Log.error(String(err));
        return null;
    }
}
exports.Add_AuthorizedUser = Add_AuthorizedUser;
function Is_AuthorizedUser(DiscordID) {
    try {
        if (exports.CommunityData[1][0].indexOf(DiscordID) <= -1) {
            //USER DOSNT EXIST
            return false;
        }
        else {
            //USER DOSE EXIST
            return true;
        }
    }
    catch (err) {
        return null;
    }
}
exports.Is_AuthorizedUser = Is_AuthorizedUser;
function Rem_RadioChannels(Index) {
    try {
        Del_RadioChannel_AUList(exports.CommunityData[0][0][Index][0].ChannelID);
        (0, database_1.Delete_Channel)(exports.CommunityData[0][1][Index]);
        exports.CommunityData[0][1].splice(Index, 1);
        exports.CommunityData[0][0].splice(Index, 1);
        exports.CommunityData[0][2].splice(Index, 1);
        index_1.RadioNet.emit("Update_Required");
        return true;
    }
    catch (err) {
        index_1.logger.error("Couldn't Delete Channel.. Got Error");
        index_1.logger.error(String(err));
        process.exit(1);
    }
}
exports.Rem_RadioChannels = Rem_RadioChannels;
function Rem_TEMPRadioChannels(Index) {
    try {
        exports.CommunityData[0][1].splice(Index, 1);
        exports.CommunityData[0][0].splice(Index, 1);
        exports.CommunityData[0][2].splice(Index, 1);
        return true;
    }
    catch (err) {
        index_1.logger.error("Couldn't Delete TEMP Channel.. Got Error");
        index_1.logger.error(String(err));
        return false;
    }
}
exports.Rem_TEMPRadioChannels = Rem_TEMPRadioChannels;
function Get_RadioChannels(Job) {
    try {
        var a = new Array();
        for (var x = 0; x <= exports.CommunityData[0][2].length - 1; x++) {
            if (String(exports.CommunityData[0][2][x]).includes(String(Job))) {
                var o = exports.CommunityData[0][0][x][0];
                if (String(o.ChannelJob).includes(String(Job))) {
                    a.push(exports.CommunityData[0][0][x]);
                }
            }
        }
        return a;
    }
    catch (err) {
        index_1.logger.error("Couldn't gather channels for job " + Job + " .. Got Error");
        index_1.logger.error(String(err));
        return new Array();
    }
}
exports.Get_RadioChannels = Get_RadioChannels;
function Add_RadioChannels(ChannelID, ChannelName, ChannelJob, isDBSync) {
    try {
        if (exports.CommunityData[0][1].indexOf(ChannelID) >= 0) {
            //CHANNEL EXISTS
            Log.warn("Channel " + ChannelID + " Exists Already");
            return false;
        }
        else {
            //CHANNEL DOSE NOT EXISTS
            if (!isDBSync) {
                var N = [{
                        ChannelID: ChannelID,
                        ChannelName: ChannelName,
                        ChannelJob: ChannelJob
                    }];
                exports.CommunityData[0][0].push(N);
                exports.CommunityData[0][1].push(ChannelID);
                exports.CommunityData[0][2].push(ChannelJob);
                Create_RadioChannel_AUList(ChannelID);
                (0, database_1.SQL_Add_RadioChannel)(ChannelID, ChannelName, ChannelJob);
                Log.success("Added Channel: " + ChannelName + " With the ID: " + ChannelID + " INDX: " + exports.CommunityData[0][1].indexOf(ChannelID));
                index_1.RadioNet.emit("Update_Required");
            }
            else {
                var N = [{
                        ChannelID: ChannelID,
                        ChannelName: ChannelName,
                        ChannelJob: ChannelJob
                    }];
                exports.CommunityData[0][0].push(N);
                exports.CommunityData[0][1].push(ChannelID);
                exports.CommunityData[0][2].push(ChannelJob);
                Create_RadioChannel_AUList(ChannelID);
                Log.success("Added Channel: " + ChannelName + " With the ID: " + ChannelID + " INDX: " + exports.CommunityData[0][1].indexOf(ChannelID));
            }
            return true;
        }
    }
    catch (err) {
        Log.error("Error at Add_RadioChannels");
        Log.error(String(err === null || err === void 0 ? void 0 : err.toString()));
        process.exit(1);
    }
}
exports.Add_RadioChannels = Add_RadioChannels;
function Get_ActiveChannel_Users(ChannelID) {
    try {
        if (exports.CommunityData[3][0].indexOf(parseInt(ChannelID)) <= -1 || exports.CommunityData[3][0].indexOf(parseInt(ChannelID)) === null) {
            console.log(exports.CommunityData[3][1][0]);
            Log.warn("Couldn't find any Radio Channels for channel ID: " + String(ChannelID));
            return new Array();
        }
        else {
            return exports.CommunityData[3][1][exports.CommunityData[3][0].indexOf(parseInt(ChannelID))];
        }
    }
    catch (err) {
        Log.error("Couldn't get Active users for Channel: " + String(ChannelID) + " Error: " + String(err));
    }
}
exports.Get_ActiveChannel_Users = Get_ActiveChannel_Users;
function Create_RadioChannel_AUList(ChannelID) {
    try {
        var x = new Array();
        x.push(new Array()); //[0] DISCORD ID's For Indexing
        x.push(new Array()); //[1] RADIO USER PROFILES
        exports.CommunityData[3][0].push(parseInt(ChannelID));
        exports.CommunityData[3][1].push(x);
        Log.info("Created Channel Active User List for channel: " + String(ChannelID));
        return true;
    }
    catch (err) {
        Log.error("Couldn't make an active channel list for channel: " + String(ChannelID));
    }
}
function Del_RadioChannel_AUList(ChannelID) {
    try {
        if (exports.CommunityData[3][0].indexOf(ChannelID) >= 0) {
            var x = exports.CommunityData[3][0].indexOf(ChannelID);
            exports.CommunityData[3][1].splice(x, 1);
            exports.CommunityData[3][0].splice(x, 1);
            Log.success("Removed Channel Active User List for channel: " + String(ChannelID));
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        Log.error("Cant Delete Radio Channel: " + String(ChannelID) + " From AU List");
    }
}
function Add_ActiveRadioUser(DiscordID, ChannelID) {
    try {
        if (exports.CommunityData[3][1][exports.CommunityData[3][0].indexOf(ChannelID)][0].indexOf(DiscordID) <= -1) {
            exports.CommunityData[3][1][exports.CommunityData[3][0].indexOf(ChannelID)][0].push(DiscordID);
            exports.CommunityData[3][1][exports.CommunityData[3][0].indexOf(ChannelID)][1].push(Get_RadioUser(DiscordID));
            Log.success("Created Active Radio User in the Channel: " + String(ChannelID) + " With the ID: " + String(DiscordID));
            return true;
        }
        else {
            Log.error("Couldn't create active radio user for user: " + String(DiscordID) + " In Channel: " + ChannelID);
            return false;
        }
    }
    catch (err) {
        Log.error("Cant add active radio user.. error: " + String(err));
    }
}
exports.Add_ActiveRadioUser = Add_ActiveRadioUser;
function Rem_ActiveRadioUser(DiscordID, ChannelID) {
    try {
        if (exports.CommunityData[3][1][exports.CommunityData[3][0].indexOf(ChannelID)][0].indexOf(DiscordID) >= 0) {
            var Channel_Index = exports.CommunityData[3][0].indexOf(ChannelID);
            var User_Index = exports.CommunityData[3][1][Channel_Index][0].indexOf(DiscordID);
            exports.CommunityData[3][1][Channel_Index][1].splice(User_Index, 1);
            exports.CommunityData[3][1][Channel_Index][0].splice(User_Index, 1);
            Log.success("Deleted Active Radio User in the Channel: " + String(ChannelID) + " With the ID: " + String(DiscordID));
            return true;
        }
        else {
            Log.error("Couldn't create active radio user for user: " + String(DiscordID) + " In Channel: " + ChannelID);
            return false;
        }
    }
    catch (err) {
        if (exports.CommunityData[4].indexOf(ChannelID) <= -1) {
            Log.error("Cant add active radio user.. error: " + String(err));
        }
        else {
            Log.info("User: " + DiscordID + " Disconnected from JTC Channel");
        }
    }
}
exports.Rem_ActiveRadioUser = Rem_ActiveRadioUser;
function Add_Message(SenderID, DiscordID, Msg) {
    try {
        if (exports.CommunityData[5][0].indexOf(parseInt(DiscordID)) <= -1) {
            var Obj = [{
                    Msg: Msg,
                    DiscordID: DiscordID,
                    Sender: SenderID,
                    isRead: false
                }];
            exports.CommunityData[5][0].push(parseInt(DiscordID));
            exports.CommunityData[5][1].push(new Array());
            var x = exports.CommunityData[5][0].indexOf(parseInt(DiscordID));
            exports.CommunityData[5][1][x].push(Obj);
            (0, Net_1.Send_Message)(Obj);
            return;
        }
        else {
            var x = exports.CommunityData[5][0].indexOf(parseInt(DiscordID));
            var Obj = [{
                    Msg: Msg,
                    DiscordID: DiscordID,
                    Sender: SenderID,
                    isRead: false
                }];
            exports.CommunityData[5][1][x].push(Obj);
            (0, Net_1.Send_Message)(Obj);
            return;
        }
    }
    catch (e) {
        Log.error("Error Adding Message..");
    }
}
exports.Add_Message = Add_Message;
function Get_Messages(DiscordID) {
    try {
        if (exports.CommunityData[5][0].indexOf(parseInt(DiscordID)) <= -1) {
            exports.CommunityData[5][0].push(parseInt(DiscordID));
            exports.CommunityData[5][1].push(new Array());
            return new Array();
        }
        else {
            var x = exports.CommunityData[5][0].indexOf(parseInt(DiscordID));
            return exports.CommunityData[5][1][x];
        }
    }
    catch (e) {
        Log.error("Error Getting Messages..");
    }
}
exports.Get_Messages = Get_Messages;
function Del_Message(DiscordID, Indx) {
    try {
        if (exports.CommunityData[5][0].indexOf(parseInt(DiscordID)) <= -1) {
            return false;
        }
        else {
            var x = exports.CommunityData[5][0].indexOf(parseInt(DiscordID));
            exports.CommunityData[5][1][x].splice(Indx, 1);
            return true;
        }
    }
    catch (e) {
        Log.error("Error Deleting Message..");
    }
}
exports.Del_Message = Del_Message;
//THIS FUNCTION SETS THE DATASTRUCTURES UP
function DS_SETUP() {
    exports.CommunityData.length = 0;
    exports.CommunityData.push(new Array()); //[0] IS THE CHANNELS
    exports.CommunityData.push(new Array()); //[1] IS FOR THE COMMUNITY DATA
    exports.CommunityData.push(new Array()); //[2] IS FOR TEMP CHANNEL DATA
    exports.CommunityData.push(new Array()); //[3] IS FOR TEMP RADIO DATA
    exports.CommunityData.push(new Array()); //[4] IS FOR TEMP RADIO JTC DATA
    exports.CommunityData.push(new Array()); //[5] IS FOR TEMP RADIO MESSAGES
    exports.CommunityData[0].push(new Array()); //[0] CONTAINS THE CHANNEL DATA
    exports.CommunityData[0].push(new Array()); //[1] CONTAINS CHANNEL ID
    exports.CommunityData[0].push(new Array()); //[2] CONTAINS CHANNEL JOBS
    exports.CommunityData[1].push(new Array()); //[0] CONTAINS DISCORD AUTHORIZED USERS
    exports.CommunityData[1].push(new Array()); //[1] CONTAINS RADIO USER PROFILE ARRAYS
    exports.CommunityData[2].push(new Array()); //[0] CONTAINS DISCORDS WITH TEMP CHANNELS
    exports.CommunityData[2].push(new Array()); //[1] CONTAINS TEMP CHANNEL INFO
    exports.CommunityData[3].push(new Array()); //[1] CONTAINS RADIO ACTIVE CHANNELS
    exports.CommunityData[3].push(new Array()); //[0] CONTAINS INDEX'S FOR CHANNEL IDS
    exports.CommunityData[5].push(new Array()); //[0] CONTAINS DISCORD ID's for Indexing
    exports.CommunityData[5].push(new Array()); //[1] CONTAINS THE RADIO USER'S MESSAGES
    exports.CommunityData[1][1].push(new Array()); //[0] CONTAINS RADIO USER PROFILE IDs for Indexing
    exports.CommunityData[1][1].push(new Array()); //[1] CONTAINS RADIO USER PROFILE
    Log.success("Structures Setup Successfully");
    return true;
}
//THIS FUNCTION GETS DATA FROM THE "CONFIG" CLASS AND SETS THE CONFIG AS THE OBJECT
function Update_Config(Obj) {
    exports.Int_Config = Obj;
    //@ts-ignore
    Log.success("Loaded Config for: " + exports.Int_Config.CommunityName);
    // @ts-ignore
    Log.success("API KEY: " + exports.Int_Config.APIPASS);
    DS_SETUP();
    // @ts-ignore
    Add_AuthorizedUser(exports.Int_Config.OwnerDiscID);
    // @ts-ignore
    (0, database_1.SetConn)(exports.Int_Config.SQLHOST, exports.Int_Config.SQLUSER, exports.Int_Config.SQLPASS, exports.Int_Config.SQLDB);
    // @ts-ignore
    (0, Net_1.startDB)();
    (0, Net_1.discordLogin)();
    Add_RadioChannels(3535863443454, "PUBLIC", "Default", true);
    (0, database_1.Load_Radio_Channels)();
    (0, database_1.Load_CommunityData)();
    // @ts-ignore
    (0, Net_1.Start_HTTPServ)(Number(exports.Int_Config.HTTPPORT));
}
exports.Update_Config = Update_Config;
function is_APIKey(APIKey) {
    // @ts-ignore
    //return String(APIKey).includes(String(Int_Config.APIPASS));
    return true;
}
exports.is_APIKey = is_APIKey;
function Create_RadioProfile(DiscordID) {
    try {
        if (!Get_RadioUser(String(DiscordID)) && Get_RadioUser(String(DiscordID)) !== null) {
            //@ts-ignore
            (0, Net_1.Sync_DiscordUser)(DiscordID, exports.Int_Config.DiscordToken);
        }
    }
    catch (err) {
        Log.error("Couln't Make Discord Radio Profile");
        Log.error(String(err));
    }
}
exports.Create_RadioProfile = Create_RadioProfile;
