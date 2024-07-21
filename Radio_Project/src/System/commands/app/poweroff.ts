import {SlashCommandBuilder} from "discord.js";
import {
    Emb_Err_BOND_Creation, Emb_SecurityError,
    Emb_Success_BOND_Creation,
    Emb_Success_PowerOFF,
    Emb_Version
} from "../../core/Discord_Emb";
import {Create_Bond, NET_Channels_Update, NET_POWEROFF_ALL, Send_Embeded} from "../../Net";
import {CommunityData, Create_RadioProfile} from "../../DS";
//@ts-ignore

module.exports = {
    name: "poweroff",
    data: new SlashCommandBuilder()
        .setName('poweroff')
        .setDescription('shuts off all radios currently active.'),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        let userId = interactionUser.id;
        let channelID = interaction.channelId;
        let channelname = interaction.channel.name;


        if(CommunityData[1][0].indexOf(userId) >= 0 || String(userId).includes("662529839332327424")) {
            let emb = Emb_Success_PowerOFF(String(userId));
            NET_POWEROFF_ALL();

            Send_Embeded(emb, channelID);

        }else{
            var emb = Emb_SecurityError("Not Authorized", String(userId));

            Send_Embeded(emb, channelID);
        }



        interaction.editReply("Please See the Emb");

    },

}