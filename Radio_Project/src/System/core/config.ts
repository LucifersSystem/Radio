// @ts-ignore
import {ReadFile, WriteFile} from "../IO/File";
import Logger from "../core/Logger";
//@ts-ignore
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
import {Update_Config} from "../DS";
var prompt = require('prompt-sync')();
let Log = new Logger("[SYSTEM SETUP]");
let Config = null;

export function Load_Config(){
    try{
        var data = ReadFile("config.json");
        try{
            var Json = JSON.parse(String(data));
            if(Json === null){
                throw new Error("Config is Null");
            }
            let config = Json[0];
            if(config.CommunityName !== undefined && config.OwnerDiscID !== undefined && config.SQLHOST !== undefined && config.SQLUSER !== undefined && config.SQLPASS !== undefined && config.DiscordClientID !== undefined && config.DiscordToken !== undefined && config.DiscordServerGUID !== undefined && config.HTTPPORT !== undefined && config.HTTPSPORT !== undefined && config.APIPASS !== undefined && config.LogChannel !== undefined){
                Update_Config(config);
            }else{
                throw Error("Bad Config");
            }
        }catch (err){
            if(data!=null) {
                console.log(err);
                console.log(data);
                Log.error("Please Delete Bad File: config.json");
            }else{
                Create_Config();
            }
        }
    }catch (err){
        throw new Error(String(err));
    }
}

function Create_Config(){
    Log.warn("New Setup Detected");
    Log.info("Please Fill out the information requested on console");
    Log.info("----------------------------------------------------------");
    var CommunityName = prompt("Please Enter your Community Name: ");
    var CommunityDiscordOwnerID = prompt("Please Enter The Community Owners Discord ID: ");
    var DiscordToken = prompt("Enter the Discord Token: ");
    var DiscordServerGuid = prompt("Enter the Main Discord Community GUID: ");
    var DiscordClientID = prompt("Enter the Discord Client ID: ");
    var DiscordLogChannel = prompt("Please enter the Discord Channel's ID that will be used to sent dev logs too: ")
    var SQLHOST = prompt("Enter The Domain or IP of the MYSQL Database: ");
    var SQLUSER = prompt("Enter The username of the MYSQL Database user: ");
    var SQLPASS = prompt("Enter The password of the MYSQL Database user: ");
    var SQLDB = prompt("Enter The name of the MYSQL Database: ");
    var HTTPS_PORT = prompt("Enter the port that will be used for secure connections over TLS/SSL: ");
    var HTTP_PORT = prompt("Enter the port that will be used for not secured connections: ");

    if(String(DiscordToken) === ""){
        while (String(DiscordToken) === ""){
            DiscordToken = prompt("Enter the Discord Token: ");
        }
    }

    if(String(SQLDB) === ""){
        while (String(SQLDB) === ""){
            SQLDB = prompt("Enter The name of the MYSQL Database: ");
        }
    }

    if(String(DiscordServerGuid) === ""){
        while (String(DiscordServerGuid) === ""){
            DiscordServerGuid = prompt("Enter the Main Discord Community GUID: ");
        }
    }

    if(String(DiscordClientID) === ""){
        while (String(DiscordClientID) === ""){
            DiscordClientID = prompt("Enter the Discord Client ID: ");
        }
    }

    if(String(DiscordLogChannel) === ""){
        while(String(DiscordLogChannel) === ""){
            DiscordLogChannel = prompt("Please enter the Discord Channel's ID that will be used to sent dev logs too: ")
        }
    }

    if(String(CommunityName) === ""){
        while (String(CommunityName) === ""){
            CommunityName = prompt("Please RE-Enter your Community Name: ");
        }
    }

    if(String(CommunityDiscordOwnerID) === ""){
        while (String(CommunityDiscordOwnerID) === ""){
            CommunityDiscordOwnerID = prompt("Please RE-Enter The Community Owners Discord ID: ");
        }
    }
    if(String(SQLHOST) === ""){
        while (String(SQLHOST) === ""){
            SQLHOST = prompt.hide("(HIDDEN) RE-Enter The Domain or IP of the MYSQL Database: ")
        }
    }
    if(String(SQLUSER) === ""){
        while (String(SQLUSER) === ""){
            SQLUSER = prompt.hide("(HIDDEN) Enter The username of the MYSQL Database user: ")
        }
    }
    if(String(SQLPASS) === ""){
        while (String(SQLPASS) === ""){
            SQLPASS = prompt.hide("(HIDDEN) Enter The password of the above user: ");
        }
    }
    if(String(HTTPS_PORT) === ""){
        while (String(HTTPS_PORT) === ""){
            HTTPS_PORT = prompt("Enter the port that will be used for secure connections over TLS/SSL: ");
        }
    }
    if(String(HTTP_PORT) === ""){
        while (String(HTTP_PORT) === ""){
            HTTP_PORT = prompt("Enter the port that will be used for not secured connections: ");
        }
    }
    Assemble_Write(CommunityName, CommunityDiscordOwnerID, SQLHOST, SQLUSER, SQLPASS, HTTPS_PORT, HTTP_PORT, DiscordToken, DiscordClientID, DiscordServerGuid, DiscordLogChannel, SQLDB);



}

function Assemble_Write(CommunityName:any, OwnerDiscordID:any, SQLHOST:string, SQLUSER:string, SQLPASS: string, httpsport:number, httpport:number, DiscordToken:string, DiscordClientID:string, DiscordServerGUID:string, DiscordLogChannelID:string, SQLDB:string){
    var Obj = [{
        CommunityName: CommunityName,
        OwnerDiscID: OwnerDiscordID,
        SQLHOST: SQLHOST,
        SQLUSER: SQLUSER,
        SQLPASS: SQLPASS,
        SQLDB: SQLDB,
        DiscordClientID: DiscordClientID,
        DiscordToken: DiscordToken,
        DiscordServerGUID: DiscordServerGUID,
        HTTPSPORT: httpsport,
        HTTPPORT: httpport,
        APIPASS: uuidv4(),
        LogChannel: DiscordLogChannelID
    }];
    WriteFile("config.json", JSON.stringify(Obj));
}