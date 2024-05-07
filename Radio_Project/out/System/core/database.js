"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Load_CommunityData = exports.Add_CommunityData = exports.Delete_CommunityData = exports.Load_Radio_Channels = exports.SQL_Add_RadioChannel = exports.Delete_ALLChannels = exports.Delete_Channel = exports.SetConn = exports.con = void 0;
var Logger_1 = __importDefault(require("./Logger"));
var DS_1 = require("../DS");
var mysql = require('mysql');
var logger = new Logger_1.default("[DATABASE]");
exports.con = null;
function SetConn(host, user, password, database) {
    exports.con = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database,
        charset: 'utf8'
    });
}
exports.SetConn = SetConn;
function Delete_Channel(ChannelID) {
    try {
        var sql = "DELETE FROM `radiodata` WHERE `ChannelID` = " + ChannelID;
        // @ts-ignore
        exports.con.query(sql, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING CHANNEL FROM DB: " + e.message);
        return false;
    }
}
exports.Delete_Channel = Delete_Channel;
function Delete_ALLChannels() {
    try {
        var sql = "TRUNCATE TABLE `radiodata`";
        // @ts-ignore
        exports.con.query(sql, data, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING ALL CHANNELS: " + e.message);
        return false;
    }
}
exports.Delete_ALLChannels = Delete_ALLChannels;
function SQL_Add_RadioChannel(ChannelID, ChannelName, Job) {
    try {
        var sql = "INSERT INTO `radiodata`(`ChannelID`,`ChannelName`, `job`) VALUES (?,?,?)";
        var data = [ChannelID, ChannelName, Job];
        // @ts-ignore
        exports.con.query(sql, data, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING CHANNEL: " + e.message);
        return false;
    }
}
exports.SQL_Add_RadioChannel = SQL_Add_RadioChannel;
function Load_Radio_Channels() {
    try {
        // @ts-ignore
        exports.con.query("SELECT * FROM `radiodata`", function (err, result) {
            if (err)
                return null;
            for (var i = 0; i < result.length; i++) {
                try {
                    var ChannelID = result[i].ChannelID;
                    var ChannelName = result[i].ChannelName;
                    var Job = result[i].job;
                    (0, DS_1.Add_RadioChannels)(ChannelID, ChannelName, Job, true);
                }
                catch (e) {
                    // @ts-ignore
                    logger.error("ERROR IN ADDING CHANNELS (DB): " + e.message);
                }
            }
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING CHANNELS (DB): " + e.message);
    }
}
exports.Load_Radio_Channels = Load_Radio_Channels;
function Delete_CommunityData() {
    try {
        var sql = "TRUNCATE TABLE `community_info`";
        // @ts-ignore
        exports.con.query(sql, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING COMMUNITY DATA: " + e.message);
        return false;
    }
}
exports.Delete_CommunityData = Delete_CommunityData;
function Add_CommunityData(Json) {
    try {
        var sql = "INSERT INTO `community_info`(`data`) VALUES (?)";
        var data = [Json];
        // @ts-ignore
        exports.con.query(sql, data, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING COMMUNITY DATA: " + e.message);
        return false;
    }
}
exports.Add_CommunityData = Add_CommunityData;
function Load_CommunityData() {
    try {
        // @ts-ignore
        exports.con.query("SELECT * FROM `community_info`", function (err, result) {
            if (err)
                return null;
            for (var i = 0; i < result.length; i++) {
                try {
                    var Index = result[i].Indx;
                    var data = result[i].data;
                    (0, DS_1.Import_CommunityData)(data);
                }
                catch (e) {
                    // @ts-ignore
                    logger.error("ERROR IN ADDING COMMUNITY DATA (DB): " + e.message);
                }
            }
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING COMMUNITY DATA (DB): " + e.message);
    }
}
exports.Load_CommunityData = Load_CommunityData;
