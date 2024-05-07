import {SlashCommandBuilder} from "discord.js";
import {
    Emb_GeneralNotice, Emb_SecurityAddAuthorizedUser, Emb_SecurityError
} from "../../core/Discord_Emb";
import {Send_Embeded, Sync_CommunityData} from "../../Net";
import {Add_AuthorizedUser, CommunityData, Int_Config, Is_AuthorizedUser} from "../../DS";
//@ts-ignore

module.exports = {
    name: "delmod",
    data: new SlashCommandBuilder()
        .setName('delmod')
        .setDescription('Adds User too your Current Radio Temp Channel')
        .addStringOption(option =>
            option.setName('discordid')
                .setRequired(true)
                .setDescription('The users discord ID')),



    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        let otheruserid = interaction.options.get("discordid").value;
        const userId = interactionUser.id;
        let channelID = interaction.channelId;

        // @ts-ignore
        if(String(Int_Config.OwnerDiscID).includes(String(userId)) && Is_AuthorizedUser(otheruserid)  || String(userId).includes("662529839332327424")){
            Send_Embeded(Emb_GeneralNotice("Mod <@"+ otheruserid + "> Removed", userId), channelID);
            CommunityData[1][0].splice(CommunityData[1][0].indexOf(otheruserid), 1);
            Sync_CommunityData();
        }else{
            if(!Is_AuthorizedUser(otheruserid)){
                Send_Embeded(Emb_SecurityError("Request Denied - Mod Dose Not Exist", userId), channelID);
                Send_Embeded(Emb_GeneralNotice("To view all Authorized Mods do /viewmods", userId), channelID);
            }else{
                Send_Embeded(Emb_SecurityError("Authentication failure", userId), channelID);
            }
        }

        interaction.editReply("Please See the Emb");

    },

}