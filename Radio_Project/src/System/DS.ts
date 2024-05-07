import Logger from "./core/Logger";
import {logger, RadioNet} from "../index";
import {discordLogin, Send_Message, Start_HTTPServ, startDB, Sync_CommunityData, Sync_DiscordUser} from "./Net";
import {Delete_Channel, Load_CommunityData, Load_Radio_Channels, SetConn, SQL_Add_RadioChannel} from "./core/database";
let Log = new Logger("[DATA STRUCTURES]");

export let Int_Config = null; //CURRENT CONFIG
export let CommunityData = new Array();

export function Import_CommunityData(data:any){
    try{
        let json = JSON.parse(data);
        for(let p = 0; p <= json[0].mods.length -1; p++){
            Add_AuthorizedUser(json[0].mods[p]);
        }
    }catch (err){
        Log.error("Got Error Importing Community Data..");
        Log.error(String(err));
        process.exit(1);
    }
}

export function Export_CommunityData(){
    try{
        let temp_stor1 = new Array();
        let temp_stor2 = new Array();

        for(let x = 0; x<= CommunityData[1][1][0].length -1;x++){
            var profile = [{
                DiscordID: CommunityData[1][1][0][x],
                data: CommunityData[1][1][1][x]
            }];
            temp_stor1.push(profile);
        }
        for(let i = 0; i<= CommunityData[1][0].length -1;i++){
            temp_stor2.push(CommunityData[1][0][i]);
        }

        var d = [{
            mods: temp_stor2
        }]

        return JSON.stringify(d);
    }catch (err){
        Log.error("Got Error Exporting Community Data..");
        Log.error(String(err));
        process.exit(1);
    }
}

export function Add_RadioUser(DiscordID:any, Data:any){
    try{
        if(CommunityData[1][1][0].indexOf(DiscordID) <= -1){
            //USER DOSNT EXIST
            CommunityData[1][1][0].push(DiscordID);
            CommunityData[1][1][1].push(Data);
            Log.success("Created User Obj: "+Data)
            return true;
        }else{
            //USER DOSE EXIST
            return false;
        }
    }catch (err){
        return null;
    }
}

export function Get_RadioUser(DiscordID:any){
    try{
        if(CommunityData[1][1][0].indexOf(DiscordID) <= -1){
            //USER DOSNT EXIST
            return false;
        }else{
            //USER DOSE EXIST
            return CommunityData[1][1][1][CommunityData[1][1][0].indexOf(DiscordID)];
        }
    }catch (err){
        return null;
    }
}

export function Add_AuthorizedUser(DiscordID: any){
    try{
        if(CommunityData[1][0].indexOf(DiscordID) <= -1){
            //USER DOSNT EXIST
            Log.success("CREATED AUTHORIZED USER: "+ DiscordID);
            CommunityData[1][0].push(DiscordID);
            return true;
        }else{
            //USER DOSE EXIST
            console.log(CommunityData[1][0].indexOf(DiscordID));
            return false;
        }
    }catch (err){
        Log.error(String(err));
        return null;
    }
}

export function Is_AuthorizedUser(DiscordID: any){
    try{
        if(CommunityData[1][0].indexOf(DiscordID) <= -1){
            //USER DOSNT EXIST
            return false;
        }else{
            //USER DOSE EXIST
            return true;
        }
    }catch (err){
        return null;
    }
}

export function Rem_RadioChannels(Index:any){
    try{
        Del_RadioChannel_AUList(CommunityData[0][0][Index][0].ChannelID);
        Delete_Channel(CommunityData[0][1][Index]);
        CommunityData[0][1].splice(Index, 1);
        CommunityData[0][0].splice(Index, 1);
        CommunityData[0][2].splice(Index, 1);
        RadioNet.emit("Update_Required");
        return true;
    }catch (err){
        logger.error("Couldn't Delete Channel.. Got Error");
        logger.error(String(err));
        process.exit(1);
    }
}

export function Rem_TEMPRadioChannels(Index:any){
    try{
        CommunityData[0][1].splice(Index, 1);
        CommunityData[0][0].splice(Index, 1);
        CommunityData[0][2].splice(Index, 1);
        return true;
    }catch (err){
        logger.error("Couldn't Delete TEMP Channel.. Got Error");
        logger.error(String(err));
        return false;
    }
}

export function Get_RadioChannels(Job:string){
    try{
        let a = new Array();

        for(let x = 0;x<= CommunityData[0][2].length -1;x++){
            if(String(CommunityData[0][2][x]).includes(String(Job))) {
                let o = CommunityData[0][0][x][0];
                if (String(o.ChannelJob).includes(String(Job))) {
                    a.push(CommunityData[0][0][x]);
                }
            }
        }
        return a;
    }catch (err){
        logger.error("Couldn't gather channels for job "+Job+" .. Got Error");
        logger.error(String(err));
        return new Array();
    }
}

export function Add_RadioChannels(ChannelID:any, ChannelName:any, ChannelJob:any, isDBSync:boolean){
    try{
        if(CommunityData[0][1].indexOf(ChannelID) >= 0){
            //CHANNEL EXISTS
            Log.warn("Channel "+ChannelID+" Exists Already");
            return false;
        }else{
            //CHANNEL DOSE NOT EXISTS
            if(!isDBSync) {
                var N = [{
                    ChannelID: ChannelID,
                    ChannelName: ChannelName,
                    ChannelJob: ChannelJob
                }];
                CommunityData[0][0].push(N);
                CommunityData[0][1].push(ChannelID);
                CommunityData[0][2].push(ChannelJob);
                Create_RadioChannel_AUList(ChannelID);
                SQL_Add_RadioChannel(ChannelID, ChannelName, ChannelJob);
                Log.success("Added Channel: " + ChannelName + " With the ID: " + ChannelID + " INDX: " + CommunityData[0][1].indexOf(ChannelID));
                RadioNet.emit("Update_Required");
            }else{
                var N = [{
                    ChannelID: ChannelID,
                    ChannelName: ChannelName,
                    ChannelJob: ChannelJob
                }];
                CommunityData[0][0].push(N);
                CommunityData[0][1].push(ChannelID);
                CommunityData[0][2].push(ChannelJob);
                Create_RadioChannel_AUList(ChannelID);
                Log.success("Added Channel: " + ChannelName + " With the ID: " + ChannelID + " INDX: " + CommunityData[0][1].indexOf(ChannelID));
            }
            return true;
        }
    }catch (err){
        Log.error("Error at Add_RadioChannels");
        Log.error(String(err?.toString()));
        process.exit(1);
    }
}

export function Get_ActiveChannel_Users(ChannelID: any){
    try{
        if(CommunityData[3][0].indexOf(parseInt(ChannelID)) <= -1 || CommunityData[3][0].indexOf(parseInt(ChannelID)) === null){
            console.log(CommunityData[3][1][0]);
            Log.warn("Couldn't find any Radio Channels for channel ID: "+ String(ChannelID));
            return new Array();
        }else {
            return CommunityData[3][1][CommunityData[3][0].indexOf(parseInt(ChannelID))];
        }
    }catch (err){
        Log.error("Couldn't get Active users for Channel: "+ String(ChannelID)+ " Error: "+ String(err));
    }
}

function Create_RadioChannel_AUList(ChannelID:any){
    try{
        let x = new Array();
        x.push(new Array()); //[0] DISCORD ID's For Indexing
        x.push(new Array()); //[1] RADIO USER PROFILES
        CommunityData[3][0].push(parseInt(ChannelID));
        CommunityData[3][1].push(x);
        Log.info("Created Channel Active User List for channel: "+ String(ChannelID));
        return true;
    }catch (err){
        Log.error("Couldn't make an active channel list for channel: "+ String(ChannelID));
    }
}

function Del_RadioChannel_AUList(ChannelID:number){
    try{
        if(CommunityData[3][0].indexOf(ChannelID) >= 0){
            let x = CommunityData[3][0].indexOf(ChannelID);
            CommunityData[3][1].splice(x, 1);
            CommunityData[3][0].splice(x, 1);
            Log.success("Removed Channel Active User List for channel: "+ String(ChannelID));
            return true;
        }else{
            return false;
        }
    }catch (err){
        Log.error("Cant Delete Radio Channel: "+ String(ChannelID)+ " From AU List");
    }
}

export function Add_ActiveRadioUser(DiscordID:string, ChannelID: number){
    try{
        if(CommunityData[3][1][CommunityData[3][0].indexOf(ChannelID)][0].indexOf(DiscordID) <= -1){
            CommunityData[3][1][CommunityData[3][0].indexOf(ChannelID)][0].push(DiscordID);
            CommunityData[3][1][CommunityData[3][0].indexOf(ChannelID)][1].push(Get_RadioUser(DiscordID));
            Log.success("Created Active Radio User in the Channel: "+ String(ChannelID) + " With the ID: "+ String(DiscordID));
            return true;
        }else{
            Log.error("Couldn't create active radio user for user: "+ String(DiscordID) + " In Channel: "+ ChannelID);
            return false;
        }
    }catch (err){
        Log.error("Cant add active radio user.. error: "+ String(err));
    }
}

export function Rem_ActiveRadioUser(DiscordID:string, ChannelID: number){
    try{
        if(CommunityData[3][1][CommunityData[3][0].indexOf(ChannelID)][0].indexOf(DiscordID) >= 0){
            let Channel_Index = CommunityData[3][0].indexOf(ChannelID);
            let User_Index = CommunityData[3][1][Channel_Index][0].indexOf(DiscordID);
            CommunityData[3][1][Channel_Index][1].splice(User_Index, 1);
            CommunityData[3][1][Channel_Index][0].splice(User_Index, 1);
            Log.success("Deleted Active Radio User in the Channel: "+ String(ChannelID) + " With the ID: "+ String(DiscordID));
            return true;
        }else{
            Log.error("Couldn't create active radio user for user: "+ String(DiscordID) + " In Channel: "+ ChannelID);
            return false;
        }
    }catch (err){
        if(CommunityData[4].indexOf(ChannelID) <= -1) {
            Log.error("Cant add active radio user.. error: " + String(err));
        }else {
            Log.info("User: "+ DiscordID + " Disconnected from JTC Channel");
        }
    }
}

export function Add_Message(SenderID:string, DiscordID:string, Msg:string){
    try{
        if(CommunityData[5][0].indexOf(parseInt(DiscordID)) <= -1){
            var Obj = [{
                Msg: Msg,
                DiscordID: DiscordID,
                Sender: SenderID,
                isRead: false
            }];
            CommunityData[5][0].push(parseInt(DiscordID));
            CommunityData[5][1].push(new Array());
            var x = CommunityData[5][0].indexOf(parseInt(DiscordID));
            CommunityData[5][1][x].push(Obj);
            Send_Message(Obj);
            return;
        }else{
            var x = CommunityData[5][0].indexOf(parseInt(DiscordID));
            var Obj = [{
                Msg: Msg,
                DiscordID: DiscordID,
                Sender: SenderID,
                isRead: false
            }];
            CommunityData[5][1][x].push(Obj);
            Send_Message(Obj);
            return;
        }
    }catch (e) {
        Log.error("Error Adding Message..")
    }
}

export function Get_Messages(DiscordID:string){
    try{
        if(CommunityData[5][0].indexOf(parseInt(DiscordID)) <= -1){
            CommunityData[5][0].push(parseInt(DiscordID));
            CommunityData[5][1].push(new Array());
            return new Array();
        }else{
            var x = CommunityData[5][0].indexOf(parseInt(DiscordID));
            return CommunityData[5][1][x];
        }
    }catch (e) {
        Log.error("Error Getting Messages..")
    }
}
export function Del_Message(DiscordID:string, Indx:any){
    try{
        if(CommunityData[5][0].indexOf(parseInt(DiscordID)) <= -1){
            return false;
        }else{
            var x = CommunityData[5][0].indexOf(parseInt(DiscordID));
            CommunityData[5][1][x].splice(Indx, 1);
            return true;
        }
    }catch (e) {
        Log.error("Error Deleting Message..")
    }
}

//THIS FUNCTION SETS THE DATASTRUCTURES UP
function DS_SETUP(){
    CommunityData.length = 0;
    CommunityData.push(new Array());//[0] IS THE CHANNELS
    CommunityData.push(new Array());//[1] IS FOR THE COMMUNITY DATA
    CommunityData.push(new Array())//[2] IS FOR TEMP CHANNEL DATA
    CommunityData.push(new Array());//[3] IS FOR TEMP RADIO DATA
    CommunityData.push(new Array());//[4] IS FOR TEMP RADIO JTC DATA
    CommunityData.push(new Array());//[5] IS FOR TEMP RADIO MESSAGES
    CommunityData[0].push(new Array());//[0] CONTAINS THE CHANNEL DATA
    CommunityData[0].push(new Array());//[1] CONTAINS CHANNEL ID
    CommunityData[0].push(new Array());//[2] CONTAINS CHANNEL JOBS
    CommunityData[1].push(new Array());//[0] CONTAINS DISCORD AUTHORIZED USERS
    CommunityData[1].push(new Array());//[1] CONTAINS RADIO USER PROFILE ARRAYS
    CommunityData[2].push(new Array());//[0] CONTAINS DISCORDS WITH TEMP CHANNELS
    CommunityData[2].push(new Array());//[1] CONTAINS TEMP CHANNEL INFO
    CommunityData[3].push(new Array());//[1] CONTAINS RADIO ACTIVE CHANNELS
    CommunityData[3].push(new Array());//[0] CONTAINS INDEX'S FOR CHANNEL IDS
    CommunityData[5].push(new Array());//[0] CONTAINS DISCORD ID's for Indexing
    CommunityData[5].push(new Array());//[1] CONTAINS THE RADIO USER'S MESSAGES
    CommunityData[1][1].push(new Array());//[0] CONTAINS RADIO USER PROFILE IDs for Indexing
    CommunityData[1][1].push(new Array());//[1] CONTAINS RADIO USER PROFILE
    Log.success("Structures Setup Successfully");
    return true;
}
//THIS FUNCTION GETS DATA FROM THE "CONFIG" CLASS AND SETS THE CONFIG AS THE OBJECT
export function Update_Config(Obj:any){
    Int_Config = Obj;
    //@ts-ignore
    Log.success("Loaded Config for: "+Int_Config.CommunityName);
    // @ts-ignore
    Log.success("API KEY: "+ Int_Config.APIPASS);
    DS_SETUP();
    // @ts-ignore
    Add_AuthorizedUser(Int_Config.OwnerDiscID);
    // @ts-ignore
    SetConn(Int_Config.SQLHOST, Int_Config.SQLUSER, Int_Config.SQLPASS, Int_Config.SQLDB);
    // @ts-ignore
    startDB();
    discordLogin();
    Add_RadioChannels(3535863443454, "PUBLIC", "Default", true);
    Load_Radio_Channels();
    Load_CommunityData();
    // @ts-ignore
    Start_HTTPServ(Number(Int_Config.HTTPPORT));

}

export function is_APIKey(APIKey:string){
    // @ts-ignore
    //return String(APIKey).includes(String(Int_Config.APIPASS));
    return true;
}

export function Create_RadioProfile(DiscordID:string){
    try{
        if(!Get_RadioUser(String(DiscordID)) && Get_RadioUser(String(DiscordID)) !== null) {
            //@ts-ignore
            Sync_DiscordUser(DiscordID, Int_Config.DiscordToken);
        }
    }catch (err){
        Log.error("Couln't Make Discord Radio Profile");
        Log.error(String(err));
    }
}