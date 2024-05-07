import {SlashCommandBuilder} from "discord.js";
import {Emb_ChannelInfo, Emb_DelChannel, Emb_NewChannel, Emb_SecurityError, Emb_Version} from "../../core/Discord_Emb";
import {MakeChannel, Send_Embeded} from "../../Net";
import {CommunityData, Int_Config, Rem_RadioChannels} from "../../DS";
import Logger from "../../core/Logger";
//@ts-ignore

module.exports = {
    name: "listchannels",
    data: new SlashCommandBuilder()
        .setName('listchannels')
        .setDescription('Deletes a Radio Channel and Instantly syncs for your community.'),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let discord_channelID = interaction.channelId;

        for(let x = 0; x<= CommunityData[0][1].length -1; x++){
            let channelID = String(CommunityData[0][1][x]);
            let channelName = String(CommunityData[0][0][CommunityData[0][1].indexOf(parseInt(channelID))][0].ChannelName);
            let ChannelJob = String(CommunityData[0][0][CommunityData[0][1].indexOf(parseInt(channelID))][0].ChannelJob);
            if(String(ChannelJob).includes("TEMP")){
                //ignore for temp channels
            }else {
                let emb = Emb_ChannelInfo(channelID, channelName, ChannelJob);
                Send_Embeded(emb, discord_channelID);
            }
        }

        interaction.editReply("Please See the Emb");

    },

}