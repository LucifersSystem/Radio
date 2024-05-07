import {Int_Config} from "../DS";

const { EmbedBuilder } = require('discord.js');

export function Emb_SecurityAddAuthorizedUser(discordID:string){
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Security Notification: ', value: "Added Authorized User", inline: true },
            { name: 'New Moderator: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_Err_MAX_SendingMsg(discordID:string, msg:string){
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'System Notification: ', value: "Cannot Send Message - \n Length Exceeded.", inline: true },
            { name: 'Message: ', value: msg, inline: true },
            { name: 'Sender: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
export function Emb_Err_SAMEPERSON_SendingMsg(discordID:string, msg:string){
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'System Notification: ', value: "Cannot Send Message - \n Cannot Send to yourself.", inline: true },
            { name: 'Message: ', value: msg, inline: true },
            { name: 'Sender: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
export function Emb_Success_SendingMsg(discordID:string, msg:string){
    var Embed = new EmbedBuilder()
        .setColor("#38ff00")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Radio Notification: ', value: "Sent Message", inline: true },
            { name: 'Message: ', value: msg, inline: true },
            { name: 'Sender: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
export function Emb_Success_SendingMsg_API(discordID:string, msg:string){
    var Embed = new EmbedBuilder()
        .setColor("#741be0")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Radio Notification: ', value: "[API] Sent Message", inline: true },
            { name: 'Message: ', value: msg, inline: true },
            { name: 'Sender: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
export function Emb_ListMods(data:string){
    var Embed = new EmbedBuilder()
        .setColor("#12e8c9")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Radio Moderators: ', value: "SEE THE ACTIVE MODS BELOW", inline: true },
            { name: '\n', value: data, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_SecurityError(error:string, discordID:string){
    var Embed = new EmbedBuilder()
        .setColor("#930404")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Security Error: ', value: error, inline: true },
            { name: 'Trigger: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_GeneralNotice(msg:string, discordID:string){
    var Embed = new EmbedBuilder()
        .setColor("#ff9000")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'NOTICE: ', value: msg, inline: true },
            { name: 'TOO: ', value: "<@"+discordID+">", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_ClientReporting(msg:string, discordID:string){
    var Embed = new EmbedBuilder()
        .setColor("#00e385")
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System Client Error/Bug Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'CLIENT AFFECTED', value: "<@"+String(discordID)+">", inline: true },
            { name: 'RAW: ', value: String(msg), inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_Version(ver:string){
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Radio Ver ', value: ver, inline: true },
            { name: 'Creator ', value: "<@662529839332327424>", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_NewTempChannel(ChannelID:string, ChannelName:string){
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: ChannelName, inline: true },
            { name: 'Channel ID: ', value: ChannelID, inline: true },
            { name: 'Status:  ', value: "Temp Channel Created", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_NewChannel(ChannelID:string, ChannelName:string){
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: ChannelName, inline: true },
            { name: 'Channel ID: ', value: ChannelID, inline: true },
            { name: 'Status:  ', value: "Created", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_DelChannel(ChannelID:string, ChannelName:string){
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: ChannelName, inline: true },
            { name: 'Channel ID: ', value: ChannelID, inline: true },
            { name: 'Status:  ', value: "Deleted", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Emb_ChannelInfo(ChannelID:string, ChannelName:string, Job:String){
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        //@ts-ignore
        .setTitle(Int_Config.CommunityName+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: ChannelName, inline: true },
            { name: 'Channel ID: ', value: ChannelID, inline: true },
            { name: 'Job: ', value: Job, inline: true },
            { name: 'Status:  ', value: "Active", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}