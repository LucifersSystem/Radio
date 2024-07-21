"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordLogin = exports.Kick_RadioUser = exports.Create_Bond = exports.Assign_RadioUserChannel = exports.Send_Message = exports.NET_POWEROFF_ALL = exports.NET_Channels_Update = exports.MakeTempChannel = exports.Sync_DiscordUser = exports.MakeChannel = exports.Send_Embeded = exports.startDB = exports.Sync_CommunityData = exports.Start_HTTPServ = void 0;
var index_1 = require("../index");
var DS_1 = require("./DS");
var Logger_1 = __importDefault(require("./core/Logger"));
var database_1 = require("./core/database");
var discord_js_1 = require("discord.js");
var node_path_1 = __importDefault(require("node:path"));
var fs_1 = __importDefault(require("fs"));
var Log = new Logger_1.default("[NET]");
///////////////DISCORD STUFF////////
// @ts-ignore
var _a = require('discord.js'), Client = _a.Client, Collection = _a.Collection, Events = _a.Events, GatewayIntentBits = _a.GatewayIntentBits;
var rest = new discord_js_1.REST();
// @ts-ignore
var commands = [];
var commands_inter = new Array();
var commandsNames = new Array();
var foldersPath = node_path_1.default.join(__dirname, 'commands');
var commandFolders = fs_1.default.readdirSync(foldersPath);
var client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});
client.commands = new Collection();
client.once(Events.ClientReady, function (c) {
    index_1.logger.success("Discord Bot Started");
    index_1.logger.success("Discord Bot Logged in as ".concat(c.user.tag));
});
// @ts-ignore
client.on(Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var x, command, error_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                if (!interaction.isChatInputCommand())
                    return [2 /*return*/];
                x = commandsNames.indexOf(interaction.commandName);
                command = commands_inter[x];
                if (!command) {
                    console.error("No command matching ".concat(interaction.commandName, " was found."));
                    console.error(String(interaction.client.commands));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 9]);
                return [4 /*yield*/, interaction.deferReply({ ephemeral: true })];
            case 2:
                _a.sent();
                return [4 /*yield*/, command.execute(interaction)];
            case 3:
                _a.sent();
                return [3 /*break*/, 9];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                if (!(interaction.replied || interaction.deferred)) return [3 /*break*/, 6];
                return [4 /*yield*/, interaction.followUp({
                        content: 'There was an error while executing this command!',
                        ephemeral: true
                    })];
            case 5:
                _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                e_1 = _a.sent();
                // @ts-ignore
                index_1.logger.error(String(e_1.message));
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); });
function Load_DiscordCommand() {
    for (var _i = 0, commandFolders_1 = commandFolders; _i < commandFolders_1.length; _i++) {
        var folder = commandFolders_1[_i];
        // Grab all the command files from the commands directory you created earlier
        var commandsPath = node_path_1.default.join(foldersPath, folder);
        var commandFiles = fs_1.default.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.js'); });
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (var _a = 0, commandFiles_1 = commandFiles; _a < commandFiles_1.length; _a++) {
            var file = commandFiles_1[_a];
            var filePath = node_path_1.default.join(commandsPath, file);
            var command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                commands_inter.push(command);
                commandsNames.push(command.name);
            }
            else {
                index_1.logger.warn("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
            }
        }
    }
}
function Sync_DiscordCommand() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, rest.put(
                        // @ts-ignore
                        discord_js_1.Routes.applicationGuildCommands(String(DS_1.Int_Config.DiscordClientID), String(DS_1.Int_Config.DiscordServerGUID)), 
                        // @ts-ignore
                        { body: commands })];
                case 1:
                    data = _a.sent();
                    // @ts-ignore
                    index_1.logger.warn("Successfully Loaded ".concat(data.length, " discord (/) commands."));
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); })();
}
/////////////END OF DISCORD STUFF//////////////////
function Start_HTTPServ(port) {
    index_1.httpServer.listen(port, function () {
        // @ts-ignore
        Log.info('Started Service on ' + DS_1.Int_Config.HTTPPORT);
    });
}
exports.Start_HTTPServ = Start_HTTPServ;
function Sync_CommunityData() {
    var r = (0, DS_1.Export_CommunityData)();
    (0, database_1.Delete_CommunityData)();
    (0, database_1.Add_CommunityData)(r);
    return;
}
exports.Sync_CommunityData = Sync_CommunityData;
function startDB() {
    // @ts-ignore
    database_1.con.connect(function (err) {
        if (err) {
            Log.error("DB CONNECTION ERROR: " + err.message);
            process.exit(1);
        }
        Log.success("Connected to DB!");
    });
}
exports.startDB = startDB;
function Send_Embeded(Object, channelID) {
    try {
        client.channels.cache.get(channelID).send({ embeds: [Object] });
        return;
    }
    catch (e) {
        // @ts-ignore
        index_1.logger.error("DISCORD SENDING ERROR: " + String(e.message));
    }
}
exports.Send_Embeded = Send_Embeded;
function MakeChannel(ChannelName, Job) {
    var x = GenerateChannelID();
    (0, DS_1.Add_RadioChannels)(x, ChannelName, Job, false);
    return x;
}
exports.MakeChannel = MakeChannel;
function Sync_DiscordUser(DiscordID, Token) {
    var axios = require('axios');
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://discord.com/api/v9/users/' + DiscordID,
        headers: {
            'Authorization': 'Bot ' + Token
        }
    };
    axios.request(config)
        .then(function (response) {
        var raw = JSON.stringify(response.data);
        var res = JSON.parse(raw);
        var userObj = [{
                DiscordID: res.id,
                DiscordUserName: res.username,
                DiscordName: res.global_name,
                FiveMID: null,
                CurrX: null,
                CurrY: null,
                CurrZ: null,
                CurrChannel: null,
                CurrPriority: false
            }];
        (0, DS_1.Add_RadioUser)(DiscordID, userObj);
    })
        .catch(function (error) {
        console.log(error);
    });
}
exports.Sync_DiscordUser = Sync_DiscordUser;
function MakeTempChannel(ChannelName, Job) {
    var x = GenerateChannelID();
    (0, DS_1.Add_RadioChannels)(x, ChannelName, Job, true);
    return x;
}
exports.MakeTempChannel = MakeTempChannel;
function NET_Channels_Update() {
    index_1.RadioNet.emit("Update_Required");
}
exports.NET_Channels_Update = NET_Channels_Update;
function NET_POWEROFF_ALL() {
    index_1.RadioNet.emit("Remote_PowerOff");
}
exports.NET_POWEROFF_ALL = NET_POWEROFF_ALL;
function Send_Message(data) {
    index_1.RadioNet.emit("New_Message", data);
}
exports.Send_Message = Send_Message;
function Assign_RadioUserChannel(DiscordID, ChannelData) {
    var obj = [{
            DiscordID: String(DiscordID),
            ChannelID: ChannelData.ChannelID,
            ChannelName: ChannelData.ChannelName
        }];
    index_1.RadioNet.emit("TEMP_CH_UPDATE", obj);
}
exports.Assign_RadioUserChannel = Assign_RadioUserChannel;
function Create_Bond(input) {
    var flag = false;
    for (var p = 0; p <= DS_1.CommunityData[0][3].length - 1; p++) {
        if (DS_1.CommunityData[0][3].length >= 0) {
            var data = DS_1.CommunityData[0][3][p];
            if (DS_1.CommunityData[0][1].indexOf(parseInt(input[0].ChannelID2) <= -1)) {
                flag = true;
                break;
            }
            if (DS_1.CommunityData[0][1].indexOf(parseInt(input[0].ChannelID1) <= -1)) {
                flag = true;
                break;
            }
            if (String(data.ChannelID1).includes(String(input[0].ChannelID1)) && String(data.ChannelID2).includes(String(input[0].ChannelID2))) {
                flag = true;
                break;
            }
            if (String(data.ChannelID2).includes(String(input[0].ChannelID2)) && String(data.ChannelID1).includes(String(input[0].ChannelID1))) {
                flag = true;
                break;
            }
        }
    }
    if (flag) {
        return false;
    }
    if (!flag) {
        DS_1.CommunityData[0][3].push(input);
        return true;
    }
}
exports.Create_Bond = Create_Bond;
function Kick_RadioUser(DiscordID) {
    var obj = [{
            DiscordID: String(DiscordID)
        }];
    index_1.RadioNet.emit("TEMP_KICK", obj);
}
exports.Kick_RadioUser = Kick_RadioUser;
function GenerateChannelID() {
    var x = false;
    while (!x) {
        var d = Math.floor(Math.random() * 9999999999);
        if (DS_1.CommunityData[0][1].indexOf(d) <= -1) {
            x = true;
            return d;
        }
    }
}
function discordLogin() {
    // @ts-ignore
    rest.setToken(String(DS_1.Int_Config.DiscordToken));
    // @ts-ignore
    client.login(String(DS_1.Int_Config.DiscordToken));
    Load_DiscordCommand();
    Sync_DiscordCommand();
}
exports.discordLogin = discordLogin;
