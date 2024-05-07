import {SlashCommandBuilder} from "discord.js";
import {Emb_NewChannel, Emb_SecurityError} from "../../core/Discord_Emb";
import {MakeChannel, Send_Embeded} from "../../Net";
import {CommunityData} from "../../DS";
//@ts-ignore

module.exports = {
    name: "newchannel",
    data: new SlashCommandBuilder()
        .setName('newchannel')
        .setDescription('Creates a Radio Channel Instantly for your community.')
        .addStringOption(option =>
            option.setName('channelname')
                .setRequired(true)
                .setDescription('The new Channel Name.'))
        .addStringOption(option =>
            option.setName('job')
                .setRequired(true)
                .setDescription('The Relevant Job Name')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let ch_name = interaction.options.get("channelname").value;
        let job_name = interaction.options.get("job").value;
        let channelID = interaction.channelId;

        if(CommunityData[1][0].indexOf(userId) >= 0 || String(userId).includes("662529839332327424")) {
            var emb = Emb_NewChannel(String(MakeChannel(ch_name, job_name)), ch_name);

            Send_Embeded(emb, channelID);
        }else{
            var emb = Emb_SecurityError("Not Authorized", String(userId));

            Send_Embeded(emb, channelID);
        }

        interaction.editReply("Please See the Emb");

    },

}