import {SlashCommandBuilder} from "discord.js";
import {
    Emb_ChannelInfo,
    Emb_GeneralNotice,
    Emb_NewTempChannel
} from "../../core/Discord_Emb";
import {Send_Embeded} from "../../Net";
import {CommunityData} from "../../DS";
//@ts-ignore

module.exports = {
    name: "mytemp",
    data: new SlashCommandBuilder()
        .setName('mytemp')
        .setDescription('Shows your Current Radio Temp Channel'),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;

        if(CommunityData[2][0].indexOf(userId) <= -1){
            Send_Embeded(Emb_GeneralNotice("User Currently Has No Temp Radio Channels", userId), channelID);
        }else{
            let x = CommunityData[2][0].indexOf(userId);
            Send_Embeded(Emb_ChannelInfo(String(CommunityData[2][1][x][0].ChannelID), CommunityData[2][1][x][0].ChannelName, "N/A"), channelID);
        }

        interaction.editReply("Please See the Emb");

    },

}