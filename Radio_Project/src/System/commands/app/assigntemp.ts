import {SlashCommandBuilder} from "discord.js";
import {
    Emb_GeneralNotice
} from "../../core/Discord_Emb";
import {Assign_RadioUserChannel, Send_Embeded} from "../../Net";
import {CommunityData} from "../../DS";
//@ts-ignore

module.exports = {
    name: "assigntemp",
    data: new SlashCommandBuilder()
        .setName('assigntemp')
        .setDescription('Adds User too your Current Radio Temp Channel')
        .addStringOption(option =>
            option.setName('discordid')
                .setRequired(true)
                .setDescription('The persons discord ID')),



    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        let otheruserid = interaction.options.get("discordid").value;
        const userId = interactionUser.id;
        let channelID = interaction.channelId;

        if(CommunityData[2][0].indexOf(userId) <= -1){
            Send_Embeded(Emb_GeneralNotice("User Currently Has No Temp Radio Channels", userId), channelID);
        }else{
            let x = CommunityData[2][0].indexOf(userId);
            Send_Embeded(Emb_GeneralNotice("Assigned User to your temp radio channel", userId), channelID);
            Assign_RadioUserChannel(otheruserid, CommunityData[2][1][x][0]);
        }

        interaction.editReply("Please See the Emb");

    },

}