import {SlashCommandBuilder} from "discord.js";
import {
    Emb_Err_MAX_SendingMsg, Emb_Err_SAMEPERSON_SendingMsg, Emb_Success_SendingMsg
} from "../../core/Discord_Emb";
import {Assign_RadioUserChannel, Kick_RadioUser, MakeTempChannel, Send_Embeded} from "../../Net";
import {Add_Message, CommunityData, Rem_TEMPRadioChannels} from "../../DS";
//@ts-ignore

module.exports = {
    name: "sendmsg",
    data: new SlashCommandBuilder()
        .setName('sendmsg')
        .setDescription('Sends a Message to a radio user.')
        .addStringOption(option =>
            option.setName('discordid')
                .setRequired(true)
                .setDescription('The Recpt Discord ID'))
        .addStringOption(option =>
            option.setName('msg')
                .setRequired(true)
                .setDescription('The Message - Max 41 chars.')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let Rcpt_DiscordID = interaction.options.get("discordid").value;
        let Rcpt_Msg = interaction.options.get("msg").value;
        let channelID = interaction.channelId;

        if(Rcpt_Msg.length <=41 && parseInt(userId) != parseInt(Rcpt_DiscordID)){
            var x = Emb_Success_SendingMsg(String(userId), Rcpt_Msg);
            Add_Message(String(userId), String(Rcpt_DiscordID), String(Rcpt_Msg));
            Send_Embeded(x, channelID);
        }else{
            if(parseInt(userId) == parseInt(Rcpt_DiscordID)){
                var x = Emb_Err_SAMEPERSON_SendingMsg(String(userId), Rcpt_Msg);
                Send_Embeded(x, channelID);
            }else {
                var x = Emb_Err_MAX_SendingMsg(String(userId), Rcpt_Msg);
                Send_Embeded(x, channelID);
            }
        }




        interaction.editReply("Please See the Emb");

    },

}