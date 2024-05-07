// @ts-ignore
import {ReadRawFile} from "../System/IO/File";

const express = require('express');
// @ts-ignore
const router = express.Router();

router.get('/priority/on.mp3', (req:any, res:any) => {
    let file = ReadRawFile("priority_on.mp3");
    res.send(file);
});

router.get('/rescue/on.mp3', (req:any, res:any) => {
    let file = ReadRawFile("rescue_on.mp3");
    res.send(file);
});

router.get('/ptt/on.mp3', (req:any, res:any) => {
    let file = ReadRawFile("ptt_on.mp3");
    res.send(file);
});

router.get('/ptt/off.mp3', (req:any, res:any) => {
    let file = ReadRawFile("ptt_off.mp3");
    res.send(file);
});

router.get('/alert/on.mp3', (req:any, res:any) => {
    let file = ReadRawFile("alert_on.mp3");
    res.send(file);
});



module.exports = router;