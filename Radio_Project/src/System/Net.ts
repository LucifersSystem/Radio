import {httpServer, logger, RadioNet} from "../index";
import {Add_RadioChannels, Add_RadioUser, CommunityData, Export_CommunityData, Int_Config} from "./DS";
import Logger from "./core/Logger";
import {Add_CommunityData, con, Delete_CommunityData} from "./core/database";
import {REST, Routes} from "discord.js";
import path from "node:path";
import fs from "fs";

let Log = new Logger("[NET]");
///////////////DISCORD STUFF////////
// @ts-ignore
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const rest = new REST();
// @ts-ignore
const commands = [];
const commands_inter = new Array();
const commandsNames = new Array();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});

client.commands = new Collection();

client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
    logger.success("Discord Bot Started");
    logger.success(`Discord Bot Logged in as ${c.user.tag}`);
});

// @ts-ignore
client.on(Events.InteractionCreate, async interaction => {
    try {
        if (!interaction.isChatInputCommand()) return;

        let x = commandsNames.indexOf(interaction.commandName);
        let command = commands_inter[x];

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            console.error(String(interaction.client.commands));
            return;
        }

        try {
            await interaction.deferReply({ ephemeral: true })
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
});

function Load_DiscordCommand(){
    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                commands_inter.push(command);
                commandsNames.push(command.name);
            } else {
                logger.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
function Sync_DiscordCommand(){
    (async () => {
        try {

            const data = await rest.put(
                // @ts-ignore
                Routes.applicationGuildCommands(String(Int_Config.DiscordClientID), String(Int_Config.DiscordServerGUID)),
                // @ts-ignore
                { body: commands },
            );


            // @ts-ignore
            logger.warn(`Successfully Loaded ${data.length} discord (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
}
/////////////END OF DISCORD STUFF//////////////////

export function Start_HTTPServ(port:Number){
    httpServer.listen(port, () => {
        // @ts-ignore
        Log.info('Started Service on '+ Int_Config.HTTPPORT);
    });
}
export function Sync_CommunityData(){
    let r = Export_CommunityData();
    Delete_CommunityData();
    Add_CommunityData(r);
    return;
}
export function startDB(){
    // @ts-ignore
    con.connect(function(err:any) {
        if (err) {
            Log.error("DB CONNECTION ERROR: "+ err.message);
            process.exit(1);
        }
        Log.success("Connected to DB!");
    });
}

export function Send_Embeded(Object: any, channelID: any){
    try{
        client.channels.cache.get(channelID).send({embeds: [Object]});
        return;
    }catch (e) {
        // @ts-ignore
        logger.error("DISCORD SENDING ERROR: "+String(e.message));
    }
}

export function MakeChannel(ChannelName:string, Job:string){
    let x = GenerateChannelID();
    Add_RadioChannels(x, ChannelName, Job, false);
    return x;
}

export function Sync_DiscordUser(DiscordID:string, Token:string) {
    const axios = require('axios');

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://discord.com/api/v9/users/'+DiscordID,
        headers: {
            'Authorization': 'Bot '+Token
        }
    };

    axios.request(config)
        .then((response: { data: any; }) => {
            let raw = JSON.stringify(response.data);
            let res = JSON.parse(raw);
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
            Add_RadioUser(DiscordID, userObj);
        })
        .catch((error: any) => {
            console.log(error);
        });
}

export function MakeTempChannel(ChannelName:string, Job:string){
    let x = GenerateChannelID();
    Add_RadioChannels(x, ChannelName, Job, true);
    return x;
}

export function NET_Channels_Update(){
    RadioNet.emit("Update_Required");
}
export function NET_POWEROFF_ALL(){
    RadioNet.emit("Remote_PowerOff");
}

export function Send_Message(data:any){
    RadioNet.emit("New_Message", data);
}

export function Assign_RadioUserChannel(DiscordID: string, ChannelData:any) {
    let obj = [{
        DiscordID: String(DiscordID),
        ChannelID: ChannelData.ChannelID,
        ChannelName: ChannelData.ChannelName
    }];
    RadioNet.emit("TEMP_CH_UPDATE", obj);
}

export function Create_Bond(input:any){
    let flag = false;
    for(let p = 0; p<= CommunityData[0][3].length -1; p++){
        if(CommunityData[0][3].length >= 0) {
            let data = CommunityData[0][3][p];

            if(CommunityData[0][1].indexOf(parseInt(input[0].ChannelID2) <= -1)){
                flag = true;
                break;
            }
            if(CommunityData[0][1].indexOf(parseInt(input[0].ChannelID1) <= -1)){
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
    if(flag){
        return false;
    }
    if(!flag){
        CommunityData[0][3].push(input);
        return true;
    }
}
export function Kick_RadioUser(DiscordID:string){
    let obj = [{
        DiscordID: String(DiscordID)
    }];
    RadioNet.emit("TEMP_KICK", obj);
}

function GenerateChannelID(){
    let x = false;
    while (!x){
        let d = Math.floor(Math.random() * 9999999999);
        if(CommunityData[0][1].indexOf(d) <= -1){
            x = true;
            return d;
        }
    }
}

export function discordLogin(){
    // @ts-ignore
    rest.setToken(String(Int_Config.DiscordToken));
    // @ts-ignore
    client.login(String(Int_Config.DiscordToken));

    Load_DiscordCommand();
    Sync_DiscordCommand();
}