"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var File_1 = require("../System/IO/File");
var express = require('express');
// @ts-ignore
var router = express.Router();
router.get('/priority/on.mp3', function (req, res) {
    var file = (0, File_1.ReadRawFile)("priority_on.mp3");
    res.send(file);
});
router.get('/rescue/on.mp3', function (req, res) {
    var file = (0, File_1.ReadRawFile)("rescue_on.mp3");
    res.send(file);
});
router.get('/ptt/on.mp3', function (req, res) {
    var file = (0, File_1.ReadRawFile)("ptt_on.mp3");
    res.send(file);
});
router.get('/ptt/off.mp3', function (req, res) {
    var file = (0, File_1.ReadRawFile)("ptt_off.mp3");
    res.send(file);
});
router.get('/alert/on.mp3', function (req, res) {
    var file = (0, File_1.ReadRawFile)("alert_on.mp3");
    res.send(file);
});
module.exports = router;
