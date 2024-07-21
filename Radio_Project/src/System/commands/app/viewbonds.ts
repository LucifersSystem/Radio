import {SlashCommandBuilder} from "discord.js";
import {
    Emb_GeneralNotice,
    Emb_ListBonds
} from "../../core/Discord_Emb";
import {Send_Embeded} from "../../Net";
import {CommunityData} from "../../DS";
//@ts-ignore

module.exports = {
    name: "viewbonds",
    data: new SlashCommandBuilder()
        .setName('viewbonds')
        .setDescription('Prints all Radio channel bonds'),



    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;

        let a = new Array();

        console.log(CommunityData[0][3]);

        if(CommunityData[0][3].length <= 0){
            let emb = Emb_GeneralNotice("No Bonded Channels Found", String(userId));
            Send_Embeded(emb, channelID);
        }else {
            try {
                for (let x = 0; x <= CommunityData[0][3].length - 1; x++) {
                    console.log(CommunityData[0][3][x].ChannelID1);
                    let ch1_inx = CommunityData[0][1].indexOf(parseInt(CommunityData[0][3][x].ChannelID1));
                    let ch2_inx = CommunityData[0][1].indexOf(parseInt(CommunityData[0][3][x].ChannelID2));
                    let channel1_Data = CommunityData[0][0][ch1_inx][0]
                    let channel2_Data = CommunityData[0][0][ch2_inx][0];
                    a.push("\n" + String(channel1_Data.ChannelName + " (" + String(channel1_Data.ChannelID) + ") & " + String(channel2_Data.ChannelName) + "(" + String(channel2_Data.ChannelID) + ") - BONDED"));
                }

                console.log(a);
                let emb = Emb_ListBonds(String(a));
                Send_Embeded(emb, channelID);
            }catch (e) {
                Send_Embeded(Emb_GeneralNotice("Unknown Error", String(userId)), channelID);
            }
        }
        interaction.editReply("Please See the Emb");

    },

}