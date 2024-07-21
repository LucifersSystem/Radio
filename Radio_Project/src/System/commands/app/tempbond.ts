import {SlashCommandBuilder} from "discord.js";
import {
    Emb_Err_BOND_Creation,
    Emb_NewChannel,
    Emb_SecurityError,
    Emb_Success_BOND_Creation
} from "../../core/Discord_Emb";
import {Create_Bond, MakeChannel, NET_Channels_Update, Send_Embeded, Sync_CommunityData} from "../../Net";
import {CommunityData} from "../../DS";
//@ts-ignore

module.exports = {
    name: "chbond",
    data: new SlashCommandBuilder()
        .setName('chbond')
        .setDescription('Creates a Radio Channel Bond.')
        .addStringOption(option =>
            option.setName('channel1id')
                .setRequired(true)
                .setDescription('The First Channel ID.'))
        .addStringOption(option =>
            option.setName('channel2id')
                .setRequired(true)
                .setDescription('The 2nd Channel ID.')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let ch1_ID = interaction.options.get("channel1id").value;
        let ch2_ID = interaction.options.get("channel2id").value;
        let channelID = interaction.channelId;

        if(CommunityData[1][0].indexOf(userId) >= 0 || String(userId).includes("662529839332327424")) {
            let x = [{
                ChannelID1: ch1_ID,
                ChannelID2: ch2_ID
            }];
            if(Create_Bond(x)){
            var emb = Emb_Success_BOND_Creation(String(userId), String(ch1_ID), String(ch2_ID));

            Send_Embeded(emb, channelID);
            Sync_CommunityData();
            NET_Channels_Update();
            }else {
                var emb = Emb_Err_BOND_Creation(String(userId), "BOND FOUND OR CHANNEL DOSNT EXIST");

                Send_Embeded(emb, channelID);
            }
        }else{
            var emb = Emb_SecurityError("Not Authorized", String(userId));

            Send_Embeded(emb, channelID);
        }

        interaction.editReply("Please See the Emb");

    },

}