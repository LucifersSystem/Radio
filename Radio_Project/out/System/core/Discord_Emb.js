"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emb_ChannelInfo = exports.Emb_DelChannel = exports.Emb_NewChannel = exports.Emb_NewTempChannel = exports.Emb_Version = exports.Emb_ClientReporting = exports.Emb_GeneralNotice = exports.Emb_SecurityError = exports.Emb_ListMods = exports.Emb_Success_SendingMsg_API = exports.Emb_Success_SendingMsg = exports.Emb_Err_SAMEPERSON_SendingMsg = exports.Emb_Err_MAX_SendingMsg = exports.Emb_SecurityAddAuthorizedUser = void 0;
var DS_1 = require("../DS");
var EmbedBuilder = require('discord.js').EmbedBuilder;
function Emb_SecurityAddAuthorizedUser(discordID) {
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Security Notification: ', value: "Added Authorized User", inline: true }, { name: 'New Moderator: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_SecurityAddAuthorizedUser = Emb_SecurityAddAuthorizedUser;
function Emb_Err_MAX_SendingMsg(discordID, msg) {
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'System Notification: ', value: "Cannot Send Message - \n Length Exceeded.", inline: true }, { name: 'Message: ', value: msg, inline: true }, { name: 'Sender: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Err_MAX_SendingMsg = Emb_Err_MAX_SendingMsg;
function Emb_Err_SAMEPERSON_SendingMsg(discordID, msg) {
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'System Notification: ', value: "Cannot Send Message - \n Cannot Send to yourself.", inline: true }, { name: 'Message: ', value: msg, inline: true }, { name: 'Sender: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Err_SAMEPERSON_SendingMsg = Emb_Err_SAMEPERSON_SendingMsg;
function Emb_Success_SendingMsg(discordID, msg) {
    var Embed = new EmbedBuilder()
        .setColor("#38ff00")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Radio Notification: ', value: "Sent Message", inline: true }, { name: 'Message: ', value: msg, inline: true }, { name: 'Sender: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Success_SendingMsg = Emb_Success_SendingMsg;
function Emb_Success_SendingMsg_API(discordID, msg) {
    var Embed = new EmbedBuilder()
        .setColor("#741be0")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Radio Notification: ', value: "[API] Sent Message", inline: true }, { name: 'Message: ', value: msg, inline: true }, { name: 'Sender: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Success_SendingMsg_API = Emb_Success_SendingMsg_API;
function Emb_ListMods(data) {
    var Embed = new EmbedBuilder()
        .setColor("#12e8c9")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Radio Moderators: ', value: "SEE THE ACTIVE MODS BELOW", inline: true }, { name: '\n', value: data, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_ListMods = Emb_ListMods;
function Emb_SecurityError(error, discordID) {
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Security Error: ', value: error, inline: true }, { name: 'Trigger: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_SecurityError = Emb_SecurityError;
function Emb_GeneralNotice(msg, discordID) {
    var Embed = new EmbedBuilder()
        .setColor("#ff9000")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'NOTICE: ', value: msg, inline: true }, { name: 'TOO: ', value: "<@" + discordID + ">", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_GeneralNotice = Emb_GeneralNotice;
function Emb_ClientReporting(msg, discordID) {
    var Embed = new EmbedBuilder()
        .setColor("#00e385")
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System Client Error/Bug Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'CLIENT AFFECTED', value: "<@" + String(discordID) + ">", inline: true }, { name: 'RAW: ', value: String(msg), inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_ClientReporting = Emb_ClientReporting;
function Emb_Version(ver) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Radio Ver ', value: ver, inline: true }, { name: 'Creator ', value: "<@662529839332327424>", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Version = Emb_Version;
function Emb_NewTempChannel(ChannelID, ChannelName) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: ChannelName, inline: true }, { name: 'Channel ID: ', value: ChannelID, inline: true }, { name: 'Status:  ', value: "Temp Channel Created", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_NewTempChannel = Emb_NewTempChannel;
function Emb_NewChannel(ChannelID, ChannelName) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: ChannelName, inline: true }, { name: 'Channel ID: ', value: ChannelID, inline: true }, { name: 'Status:  ', value: "Created", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_NewChannel = Emb_NewChannel;
function Emb_DelChannel(ChannelID, ChannelName) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: ChannelName, inline: true }, { name: 'Channel ID: ', value: ChannelID, inline: true }, { name: 'Status:  ', value: "Deleted", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_DelChannel = Emb_DelChannel;
function Emb_ChannelInfo(ChannelID, ChannelName, Job) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(DS_1.Int_Config.CommunityName + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: ChannelName, inline: true }, { name: 'Channel ID: ', value: ChannelID, inline: true }, { name: 'Job: ', value: Job, inline: true }, { name: 'Status:  ', value: "Active", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_ChannelInfo = Emb_ChannelInfo;
