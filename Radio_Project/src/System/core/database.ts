import Logger from "./Logger";
import {Add_RadioChannels, Import_CommunityData, Int_Config} from "../DS";
var mysql = require('mysql');

const logger = new Logger("[DATABASE]");

export var con = null;


export function SetConn(host:string, user:string, password:string, database:string){
    con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        charset : 'utf8'
    });
}

export function Delete_Channel(ChannelID:Number){
    try {
        let sql = `DELETE FROM \`radiodata\` WHERE \`ChannelID\` = `+ChannelID;
        // @ts-ignore
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            return true;
        })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING CHANNEL FROM DB: "+ e.message);
        return false;
    }
}

export function Delete_ALLChannels(){
    try {
        let sql = `TRUNCATE TABLE \`radiodata\``;
        // @ts-ignore
        con.query(sql, data, function (err, result) {
            if (err) console.log(err);
            return true;
        })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING ALL CHANNELS: "+ e.message);
        return false;
    }
}

export function SQL_Add_RadioChannel(ChannelID:Number, ChannelName:string, Job:string){
    try {
        let sql = `INSERT INTO \`radiodata\`(\`ChannelID\`,\`ChannelName\`, \`job\`) VALUES (?,?,?)`;
        let data = [ChannelID, ChannelName, Job];
        // @ts-ignore
        con.query(sql, data, function (err, result) {
            if (err) console.log(err);
            return true;
        })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING CHANNEL: "+ e.message);
        return false;
    }
}

export function Load_Radio_Channels(){

    try {
        // @ts-ignore
        con.query("SELECT * FROM `radiodata`", function (err, result){
            if (err) return null;
            for(var i = 0; i < result.length; i++) {
                try {
                    let ChannelID = result[i].ChannelID;
                    let ChannelName = result[i].ChannelName;
                    let Job = result[i].job;
                    Add_RadioChannels(ChannelID, ChannelName, Job, true);
                }catch (e) {
                    // @ts-ignore
                    logger.error("ERROR IN ADDING CHANNELS (DB): "+ e.message);
                }
            }
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING CHANNELS (DB): "+ e.message);
    }
}

export function Delete_CommunityData(){
    try {
        let sql = `TRUNCATE TABLE \`community_info\``;
        // @ts-ignore
        con.query(sql, function (err, result) {
            if (err) console.log(err);
            return true;
        })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING COMMUNITY DATA: "+ e.message);
        return false;
    }
}

export function Add_CommunityData(Json:any){
    try {
        let sql = `INSERT INTO \`community_info\`(\`data\`) VALUES (?)`;
        let data = [Json];
        // @ts-ignore
        con.query(sql, data, function (err, result) {
            if (err) console.log(err);
            return true;
        })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING COMMUNITY DATA: "+ e.message);
        return false;
    }
}

export function Load_CommunityData(){

    try {
        // @ts-ignore
        con.query("SELECT * FROM `community_info`", function (err, result){
            if (err) return null;
            for(var i = 0; i < result.length; i++) {
                try {
                    let Index = result[i].Indx;
                    let data = result[i].data;
                    Import_CommunityData(data);
                }catch (e) {
                    // @ts-ignore
                    logger.error("ERROR IN ADDING COMMUNITY DATA (DB): "+ e.message);
                }
            }
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING COMMUNITY DATA (DB): "+ e.message);
    }
}

