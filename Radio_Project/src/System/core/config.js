"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Load_Config = void 0;
// @ts-ignore
var File_1 = require("../IO/File");
var Config = null;
function Load_Config() {
    try {
        var c = (0, File_1.ReadJSONFile)("config.json");
        if (String(c.CommunityName).includes("")) {
            throw new Error("Community Name Cant be nothing!!");
        }
    }
    catch (err) {
        throw new Error(String(err));
    }
}
exports.Load_Config = Load_Config;
