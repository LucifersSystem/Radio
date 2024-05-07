"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteFile = exports.ReadRawFile = exports.ReadFile = void 0;
var fs_1 = __importDefault(require("fs"));
var Logger_1 = __importDefault(require("../core/Logger"));
var Log = new Logger_1.default("[FILE MANAGER]");
function ReadFile(filename) {
    try {
        var p = fs_1.default.readFileSync(filename);
        Log.success("SUCCESSFULLY READ FILE: " + filename);
        return p.toString();
    }
    catch (err) {
        Log.error("Could Not Read File: " + filename);
        return null;
    }
}
exports.ReadFile = ReadFile;
function ReadRawFile(filename) {
    try {
        var p = fs_1.default.readFileSync(filename);
        return p;
    }
    catch (err) {
        Log.error("Could Not Read File: " + filename);
        return null;
    }
}
exports.ReadRawFile = ReadRawFile;
function WriteFile(name, data) {
    fs_1.default.writeFile(String(name), data, function (err) {
        if (err) {
            Log.error("CANNOT WRITE FILE: " + name);
            return false;
        }
        else {
            // file written successfully
            Log.success("Successfully Created File: " + name);
            return true;
        }
    });
}
exports.WriteFile = WriteFile;
