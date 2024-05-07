import {Add_Message, CommunityData, Del_Message, Get_Messages, Int_Config} from "../System/DS";
import {Emb_Success_SendingMsg_API} from "../System/core/Discord_Emb";
import {Send_Embeded} from "../System/Net";

const express = require('express');
const router = express.Router();

router.get('/', (req:any, res:any) => {
    res.send("LUCIFERS RADIO V2.0.0");
});

router.get('/:key/radio/users/', (req:any, res:any) => {
    let Api_Key = req.params.key;
    // @ts-ignore
    if(Api_Key.length >= 100 || Api_Key.length <= 10 || !String(Int_Config.APIPASS).includes(Api_Key)){
        res.send(Error_Builder("Invalid API Key"));
    }else {
        res.send(String(JSON.stringify(CommunityData[1][1][1])));
    }
});

router.post('/:key/radio/users/msg/:sender/:discord/:msg/', (req:any, res:any) => {
    let Api_Key = req.params.key;
    let DiscordID = req.params.discord;
    let Sender_DiscordID = req.params.sender;
    let NewMsg = req.params.msg;
    // @ts-ignore
    if(Api_Key.length >= 100 || Api_Key.length <= 10 || !String(Int_Config.APIPASS).includes(Api_Key)){
        res.send(Error_Builder("Invalid API Key"))
    }else{
        if(DiscordID.length <= 6 || DiscordID.length >= 20 || String(DiscordID).includes("0000000000000") || Sender_DiscordID.length <= 6 || Sender_DiscordID.length >= 20 || String(Sender_DiscordID).includes("0000000000000")){
            res.send("Invalid Discord ID");
        }else{
            if(NewMsg.length <= 47){
                var x = Emb_Success_SendingMsg_API(String(Sender_DiscordID), NewMsg);
                Add_Message(String(Sender_DiscordID), String(DiscordID), String(NewMsg));
                // @ts-ignore
                Send_Embeded(x, Int_Config.LogChannel);
                res.send(Success_Builder());
            }else{
                res.send(Error_Builder("Invalid Message, or Message greater then max length."));
            }
        }

    }

});
router.get('/:key/radio/users/msg/:discord/', (req:any, res:any) => {
    let Api_Key = req.params.key;
    let DiscordID = req.params.discord;
    // @ts-ignore
    if(Api_Key.length >= 100 || Api_Key.length <= 10 || !String(Int_Config.APIPASS).includes(Api_Key)){
        res.send(Error_Builder("Invalid API Key"))
    }else{
        if(DiscordID.length <= 6 || DiscordID.length >= 20 || String(DiscordID).includes("0000000000000")){
            res.send("Invalid Discord ID");
        }else{
            let r = JSON.stringify(Get_Messages(DiscordID));
            res.send(r);
        }

    }

});
router.delete('/:key/radio/users/msg/:discord/:indx', (req:any, res:any) => {
    let Api_Key = req.params.key;
    let DiscordID = req.params.discord;
    let Index = parseInt(req.params.indx);
    // @ts-ignore
    if(Api_Key.length >= 100 || Api_Key.length <= 10 || !String(Int_Config.APIPASS).includes(Api_Key)){
        res.send(Error_Builder("Invalid API Key"))
    }else{
        if(DiscordID.length <= 6 || DiscordID.length >= 20 || String(DiscordID).includes("0000000000000")){
            res.send("Invalid Discord ID");
        }else{
            let r = Del_Message(String(DiscordID), Index);
            if(r){
                res.send(Success_Builder());
            }else{
                res.send(Error_Builder("Unknown Discord ID, or Out of Bounds."))
            }
        }

    }

});



// @ts-ignore
router.get('/:key/radio/channels/', (req:any, res:any) => {
    let Api_Key = req.params.key;
    // @ts-ignore
    if(Api_Key.length >= 100 || Api_Key.length <= 10 || !String(Int_Config.APIPASS).includes(Api_Key)){
        res.send(Error_Builder("Invalid API Key"));
    }else {
        res.send(String(JSON.stringify(CommunityData[0][0])));
    }
});


function Error_Builder(Error:any){
    var d = [{
        Code: 1,
        Error: "Request Error",
        Reason: String(Error)
    }];

    return JSON.stringify(d);
}
function Success_Builder(){
    var d = [{
        Code: 0,
        Result: "SUCCESS"
    }];

    return JSON.stringify(d);
}

module.exports = router;