import {SlashCommandBuilder} from "discord.js";
import {Emb_Version} from "../../core/Discord_Emb";
import {Send_Embeded} from "../../Net";
import {Create_RadioProfile} from "../../DS";
//@ts-ignore

module.exports = {
    name: "ver",
    data: new SlashCommandBuilder()
        .setName('ver')
        .setDescription('Shows the current radio system version'),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        let userId = interactionUser.id;
        let channelID = interaction.channelId;
        let channelname = interaction.channel.name;


        let emb = Emb_Version("2.0.0");
        Create_RadioProfile("662529839332327424");

        Send_Embeded(emb, channelID);

        interaction.editReply("Please See the Emb");

    },

}