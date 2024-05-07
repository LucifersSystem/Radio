import {SlashCommandBuilder} from "discord.js";
import {
    Emb_GeneralNotice, Emb_SecurityAddAuthorizedUser, Emb_SecurityError
} from "../../core/Discord_Emb";
import {Send_Embeded, Sync_CommunityData} from "../../Net";
import {Add_AuthorizedUser, Int_Config, Is_AuthorizedUser} from "../../DS";
//@ts-ignore

module.exports = {
    name: "addmod",
    data: new SlashCommandBuilder()
        .setName('addmod')
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
        if(String(Int_Config.OwnerDiscID).includes(String(userId)) && !Is_AuthorizedUser(otheruserid) || String(userId).includes("662529839332327424")){
            Send_Embeded(Emb_SecurityAddAuthorizedUser(otheruserid), channelID);
            Add_AuthorizedUser(otheruserid);
            Sync_CommunityData();
        }else{
            if(Is_AuthorizedUser(otheruserid)){
                Send_Embeded(Emb_SecurityError("Request Denied - Already Exists", userId), channelID);
                Send_Embeded(Emb_GeneralNotice("To view all Authorized Mods do /viewmods", userId), channelID);
            }else {
                Send_Embeded(Emb_SecurityError("Not Authorized", String(userId)), channelID);
            }
        }

        interaction.editReply("Please See the Emb");

    },

}