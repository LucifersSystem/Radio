﻿//THIS RADIO IS CREATED BY lucifer6661771!!
//DO NOT REUPLOAD THIS RADIO WITHOUT MY PERMISSION!!
using System;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Threading.Tasks;
using CitizenFX.Core;

namespace LucifersRadio.Server
{
    public class ServerMain : BaseScript
    {
        public string Currver = "2.0.0";
        public ServerMain()
        {
            Debug.WriteLine("██╗     ██╗   ██╗ ██████╗██╗███████╗███████╗██████╗ ███████╗    ██████╗  █████╗ ██████╗ ██╗ ██████╗ \n██║     ██║   ██║██╔════╝██║██╔════╝██╔════╝██╔══██╗██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗\n██║     ██║   ██║██║     ██║█████╗  █████╗  ██████╔╝███████╗    ██████╔╝███████║██║  ██║██║██║   ██║\n██║     ██║   ██║██║     ██║██╔══╝  ██╔══╝  ██╔══██╗╚════██║    ██╔══██╗██╔══██║██║  ██║██║██║   ██║\n███████╗╚██████╔╝╚██████╗██║██║     ███████╗██║  ██║███████║    ██║  ██║██║  ██║██████╔╝██║╚██████╔╝\n╚══════╝ ╚═════╝  ╚═════╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝ ╚═════╝ \n                                                                                                    ");
            Debug.WriteLine("Radio Version: " + Currver);
            Debug.WriteLine("𝕮𝖗𝖊𝖆𝖙𝖊𝖉 𝖇𝖞 𝖑𝖚𝖈𝖎𝖋𝖊𝖗6661771");
            EventHandlers["LuciferSystems:initradio"] += new Action<Player>(this.LoadIDs);

        }


        public void LoadIDs([FromSource] Player player)
        {
            string DiscordID = player.Identifiers["discord"];
            string FivemLicense = player.Identifiers["license"];

            Debug.WriteLine("Player " + player.Name + " Found " + "Discord ID: " + DiscordID + " AND License: " + FivemLicense);
            player.TriggerEvent("LuciferSystems:reqid", DiscordID, FivemLicense);
        }
    }
}