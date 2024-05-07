"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = require("../System/IO/File");
var express = require('express');
var router = express.Router();
router.get('/jq.js', function (req, res) {
    var file = (0, File_1.ReadRawFile)("jq.js");
    res.send(file);
});
router.get('/voice.js', function (req, res) {
    var file = (0, File_1.ReadRawFile)("voice.js");
    res.send(file);
});
module.exports = router;
