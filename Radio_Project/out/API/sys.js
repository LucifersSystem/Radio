"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DS_1 = require("../System/DS");
var Discord_Emb_1 = require("../System/core/Discord_Emb");
var Net_1 = require("../System/Net");
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.send("LUCIFERS RADIO V2.0.0");
});
router.get('/:key/radio/users/', function (req, res) {
    var Api_Key = req.params.key;
    // @ts-ignore
    if (Api_Key.length >= 100 || Api_Key.length <= 10 || !String(DS_1.Int_Config.APIPASS).includes(Api_Key)) {
        res.send(Error_Builder("Invalid API Key"));
    }
    else {
        res.send(String(JSON.stringify(DS_1.CommunityData[1][1][1])));
    }
});
router.post('/:key/radio/users/msg/:sender/:discord/:msg/', function (req, res) {
    var Api_Key = req.params.key;
    var DiscordID = req.params.discord;
    var Sender_DiscordID = req.params.sender;
    var NewMsg = req.params.msg;
    // @ts-ignore
    if (Api_Key.length >= 100 || Api_Key.length <= 10 || !String(DS_1.Int_Config.APIPASS).includes(Api_Key)) {
        res.send(Error_Builder("Invalid API Key"));
    }
    else {
        if (DiscordID.length <= 6 || DiscordID.length >= 20 || String(DiscordID).includes("0000000000000") || Sender_DiscordID.length <= 6 || Sender_DiscordID.length >= 20 || String(Sender_DiscordID).includes("0000000000000")) {
            res.send("Invalid Discord ID");
        }
        else {
            if (NewMsg.length <= 47) {
                var x = (0, Discord_Emb_1.Emb_Success_SendingMsg_API)(String(Sender_DiscordID), NewMsg);
                (0, DS_1.Add_Message)(String(Sender_DiscordID), String(DiscordID), String(NewMsg));
                // @ts-ignore
                (0, Net_1.Send_Embeded)(x, DS_1.Int_Config.LogChannel);
                res.send(Success_Builder());
            }
            else {
                res.send(Error_Builder("Invalid Message, or Message greater then max length."));
            }
        }
    }
});
router.get('/:key/radio/users/msg/:discord/', function (req, res) {
    var Api_Key = req.params.key;
    var DiscordID = req.params.discord;
    // @ts-ignore
    if (Api_Key.length >= 100 || Api_Key.length <= 10 || !String(DS_1.Int_Config.APIPASS).includes(Api_Key)) {
        res.send(Error_Builder("Invalid API Key"));
    }
    else {
        if (DiscordID.length <= 6 || DiscordID.length >= 20 || String(DiscordID).includes("0000000000000")) {
            res.send("Invalid Discord ID");
        }
        else {
            var r = JSON.stringify((0, DS_1.Get_Messages)(DiscordID));
            res.send(r);
        }
    }
});
router.delete('/:key/radio/users/msg/:discord/:indx', function (req, res) {
    var Api_Key = req.params.key;
    var DiscordID = req.params.discord;
    var Index = parseInt(req.params.indx);
    // @ts-ignore
    if (Api_Key.length >= 100 || Api_Key.length <= 10 || !String(DS_1.Int_Config.APIPASS).includes(Api_Key)) {
        res.send(Error_Builder("Invalid API Key"));
    }
    else {
        if (DiscordID.length <= 6 || DiscordID.length >= 20 || String(DiscordID).includes("0000000000000")) {
            res.send("Invalid Discord ID");
        }
        else {
            var r = (0, DS_1.Del_Message)(String(DiscordID), Index);
            if (r) {
                res.send(Success_Builder());
            }
            else {
                res.send(Error_Builder("Unknown Discord ID, or Out of Bounds."));
            }
        }
    }
});
// @ts-ignore
router.get('/:key/radio/channels/', function (req, res) {
    var Api_Key = req.params.key;
    // @ts-ignore
    if (Api_Key.length >= 100 || Api_Key.length <= 10 || !String(DS_1.Int_Config.APIPASS).includes(Api_Key)) {
        res.send(Error_Builder("Invalid API Key"));
    }
    else {
        res.send(String(JSON.stringify(DS_1.CommunityData[0][0])));
    }
});
function Error_Builder(Error) {
    var d = [{
            Code: 1,
            Error: "Request Error",
            Reason: String(Error)
        }];
    return JSON.stringify(d);
}
function Success_Builder() {
    var d = [{
            Code: 0,
            Result: "SUCCESS"
        }];
    return JSON.stringify(d);
}
module.exports = router;
