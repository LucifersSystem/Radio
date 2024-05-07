import {SlashCommandBuilder} from "discord.js";
import {
    Emb_GeneralNotice,
    Emb_NewTempChannel
} from "../../core/Discord_Emb";
import {Assign_RadioUserChannel, Kick_RadioUser, MakeTempChannel, Send_Embeded} from "../../Net";
import {CommunityData, Rem_TEMPRadioChannels} from "../../DS";
//@ts-ignore

module.exports = {
    name: "newtemp",
    data: new SlashCommandBuilder()
        .setName('newtemp')
        .setDescription('Creates a Radio Channel Instantly for your community.')
        .addStringOption(option =>
            option.setName('channelname')
                .setRequired(true)
                .setDescription('The new Channel Name.')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let ch_name = interaction.options.get("channelname").value;
        let channelID = interaction.channelId;

        if(CommunityData[2][0].indexOf(userId) <= -1){
            var chid = MakeTempChannel(ch_name, "TEMP");
            var emb = Emb_NewTempChannel(String(chid), ch_name);
            var d = [{
                ChannelName: ch_name,
                ChannelID: chid
            }];

            CommunityData[2][0].push(userId);
            CommunityData[2][1].push(d);
            Send_Embeded(emb, channelID);
        }else{
            Kick_RadioUser(userId);
            Rem_TEMPRadioChannels(CommunityData[0][1].indexOf(parseInt(CommunityData[2][1][CommunityData[2][0].indexOf(userId)].ChannelID)));
            CommunityData[2][1].splice(CommunityData[2][0].indexOf(userId), 1);
            CommunityData[2][0].splice(CommunityData[2][0].indexOf(userId), 1);
            Kick_RadioUser(userId);
            Send_Embeded(Emb_GeneralNotice("Please assign yourself to yourself and others when ready using the /assigntemp command in discord.", userId), channelID);
            var chid = MakeTempChannel(ch_name, "TEMP");
            var emb = Emb_NewTempChannel(String(chid), ch_name);
            var d = [{
                ChannelName: ch_name,
                ChannelID: chid
            }];

            CommunityData[2][0].push(userId);
            CommunityData[2][1].push(d);
            Send_Embeded(emb, channelID);
        }




        interaction.editReply("Please See the Emb");

    },

}