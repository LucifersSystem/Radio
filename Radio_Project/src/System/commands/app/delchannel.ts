import {SlashCommandBuilder} from "discord.js";
import {Emb_DelChannel, Emb_NewChannel, Emb_SecurityError, Emb_Version} from "../../core/Discord_Emb";
import {MakeChannel, Send_Embeded} from "../../Net";
import {CommunityData, Int_Config, Rem_RadioChannels} from "../../DS";
import Logger from "../../core/Logger";
//@ts-ignore

module.exports = {
    name: "delchannel",
    data: new SlashCommandBuilder()
        .setName('delchannel')
        .setDescription('Deletes a Radio Channel and Instantly syncs for your community.')
        .addStringOption(option =>
            option.setName('channelid')
                .setRequired(true)
                .setDescription('The Channel ID of the radio channel you want to delete.')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let ch_ID = interaction.options.get("channelid").value;
        let channelID = interaction.channelId;

        if(parseInt(ch_ID) === 3535863443454){
            let emb = Emb_SecurityError("Not Authorized", String(userId));
            Send_Embeded(emb, channelID);
        }else {
            if (CommunityData[0][1].indexOf(parseInt(ch_ID)) >= 0 && CommunityData[1][0].indexOf(userId) >= 0 || String(userId).includes("662529839332327424") && CommunityData[0][1].indexOf(parseInt(ch_ID)) >= 0) {
                let emb = Emb_DelChannel(String(ch_ID), String(CommunityData[0][0][CommunityData[0][1].indexOf(parseInt(ch_ID))][0].ChannelName));
                Rem_RadioChannels(CommunityData[0][1].indexOf(parseInt(ch_ID)));
                Send_Embeded(emb, channelID);
            } else {
                let emb = Emb_SecurityError("Not Authorized", String(userId));
                Send_Embeded(emb, channelID);
            }
        }

        interaction.editReply("Please See the Emb");

    },

}