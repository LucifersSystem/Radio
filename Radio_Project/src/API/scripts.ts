import {ReadRawFile} from "../System/IO/File";

const express = require('express');
const router = express.Router();

router.get('/jq.js', (req:any, res:any) => {
    let file = ReadRawFile("jq.js");
    res.send(file);
});

router.get('/voice.js', (req:any, res:any) => {
    let file = ReadRawFile("voice.js");
    res.send(file);
});


module.exports = router;