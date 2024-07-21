import {SlashCommandBuilder} from "discord.js";
import {
    Emb_ListMods
} from "../../core/Discord_Emb";
import {Send_Embeded} from "../../Net";
import {CommunityData, Int_Config} from "../../DS";
//@ts-ignore

module.exports = {
    name: "viewmods",
    data: new SlashCommandBuilder()
        .setName('viewmods')
        .setDescription('Prints all Radio Mods'),



    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;

        let a = new Array();

        // @ts-ignore
        for(let x = 0; x<= CommunityData[1][0].length -1;x++){
            // @ts-ignore
            if(String(CommunityData[1][0][x]).includes(String(Int_Config.OwnerDiscID))){
                a.push("\n <@" + CommunityData[1][0][x] + "> - Creator");
                a.push("\n <@" + CommunityData[1][0][x] + "> - Community Owner");
            }else{
                a.push("\n <@" + CommunityData[1][0][x] + "> - Radio Moderator");
            }
        }

        let emb = Emb_ListMods(String(a));
        Send_Embeded(emb, channelID);

        interaction.editReply("Please See the Emb");

    },

}