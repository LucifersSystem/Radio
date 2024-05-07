//THIS RADIO IS CREATED BY lucifer6661771!!
//DO NOT REUPLOAD THIS RADIO WITHOUT MY PERMISSION!!
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;
using CitizenFX.Core;
using CitizenFX.Core.Native;
using CitizenFX.Core.UI;
using Mono.CSharp.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static CitizenFX.Core.Native.API;

namespace LucifersRadio.Client
{   
    public class ClientMain : BaseScript
    {
        
        protected internal static Action<string, string, string, string> RadioLNUpdateInternal;
        protected internal static Action<string> setModel;
        protected internal static Action<string, string, string, string, string, string, string, string, string> Radio_ScreenUpdateInternal;
        protected internal static Action<string, string> Radio_ScreenUpdate_NewMessage;
        protected internal static Action openInternal;
        protected internal static Action closeInternal;
        protected internal static Action powerOffInternal;
        protected internal static Action<string> ledmodeInternal;
        protected internal static Action<string> showAlertInternal;
        protected internal static Action<string> setModelInternal;
        protected internal static Action<bool> pttInternal;
        protected internal static Action<string> channelChangeInternal;
        protected internal static Action<bool> setVisibilityInternal;
        protected internal static Action focusInternal;
        protected internal static Action unfocusInternal;
        protected internal static Action toggleFocusInternal;
        protected internal static Action<string, string, string> Drawgps;
        protected internal static Action<string, int> SetJOB;


        bool isinVeh = false;
        bool isDevMode = false;
        bool isRadioActive = false;
        bool isSystemMessagingActive = false;
        bool isInit = false;
        bool isSelMode = false;
        bool isViewMsg = false;
        int Selected_MsgIndx = 0;
        int Selected_PlayerIndx = 0;
        public bool isConnnected = false;
        public int Curr_Volume = 0;
        public int Radio_MaxChannels = 0;
        public string Radio_CommunityName = "";
        public string CurrChannelName = "";
        public int CurrChannel = 0;
        public bool isFocused = false;
        public bool isRadioPTT = false;
        public string CurrModel = "APX8000";
        public string Curr_Job = "";
        public string Last_Job = "";
        public string Curr_DiscordID = "";
        public string Curr_License = "";

        

        public ClientMain()
        {
            Debug.WriteLine("𝕮𝖗𝖊𝖆𝖙𝖊𝖉 𝖇𝖞 𝖑𝖚𝖈𝖎𝖋𝖊𝖗6661771");
            //EXPORTS
            Radio_ScreenUpdateInternal = delegate (string btn01, string btn02, string btn03, string btn04, string btn05, string ln01, string ln02, string zn, string ch)
            {
                Exports["radio"].dispUpdate(btn01, btn02, btn03, btn04, btn05, ln01, ln02, zn, ch);
            };
            Radio_ScreenUpdate_NewMessage = delegate (string title, string msg)
            {
                Exports["radio"].ShowMsg(title, msg);
            };
            SetJOB = delegate (string Job, int Rank)
            {
                Exports["radio"].SetJob(Job, Rank);
            };
            Drawgps = delegate (string x, string y, string z)
            {
                Exports["radio"].Drawgps(x, y, x);
            };
            setModel = delegate (string model)
            {
                Exports["radio"].setModel(model);
            };
            RadioLNUpdateInternal = delegate (string ln1, string ln2, string zn, string ch)
            {
                Exports["radio"].lnUpdate(ln1, ln2, zn, ch);
            };
            openInternal = delegate
            {
                Exports["radio"].open();
            };
            closeInternal = delegate
            {
                Exports["radio"].close();
            };
            powerOffInternal = delegate
            {
                Exports["radio"].powerOff();
            };
            ledmodeInternal = delegate (string mode)
            {
                Exports["radio"].ledmode(mode);
            };
            showAlertInternal = delegate (string alert)
            {
                Exports["radio"].showAlert(alert);
            };
            setModelInternal = delegate (string model)
            {
                Exports["radio"].setModel(model);
            };
            setVisibilityInternal = delegate (bool state)
            {
                Exports["radio"].setVisibility(state);
            };
            pttInternal = delegate (bool value)
            {
                BaseScript.TriggerEvent("radioInternal:ptt", new object[1] { value });
            };
            focusInternal = delegate
            {
                Exports["radio"].focus();
            };
            unfocusInternal = delegate
            {
                Exports["radio"].unfocus();
            };
            toggleFocusInternal = delegate
            {
                Exports["radio"].toggleFocus();
            };
            ///////////////////////////////////////////
            Log.info("Loading Lucifers Radio System");
            Log.debug("CREATED BY lucifer6661771");
            EventHandlers["LuciferSystems:reqid"] += new Action<String, String>(this.Set_IDs);
            API.RegisterKeyMapping("+ptt", "Radio Talk Button", "keyboard", API.GetConvar("radio_defaultPtt", "f3"));
            API.RegisterKeyMapping("+focusradio", "Focus on the radio", "keyboard", API.GetConvar("lr_defaultFocus", "OEM_4"));
            RegisterNuiCallbackType("radiodata");

            EventHandlers["__cfx_nui:radiodata"] += new Action<IDictionary<string, object>, CallbackDelegate>((data, cb) =>
            {
                try
                {
                    string msgtype = data["msgType"].ToString();
                    var obj = new { res = "success" };
                    cb(JsonConvert.SerializeObject((object)obj));
                    switch (msgtype)
                    {
                        case "connecting":
                            isInit = false;
                            break;
                        case "No_Msgs": 
                            isViewMsg = false;
                            showAlertInternal("No Messages");
                            string Total = data["Total"].ToString();
                            Radio_ScreenUpdateInternal("+Vol", "-Vol", "SelU", "", "", "Total Messages", "", "", "");
                            RadioLNUpdateInternal("Total Messages", Total, "", "");
                            Selected_MsgIndx = 0;
                            break;
                        case "Show_Msg":
                            isViewMsg = true;
                            string Msg = data["Message"].ToString();
                            string Type = data["Type"].ToString();
                            Show_Msg(Type, Msg);
                            break;
                        case "Rst_MsgIndx":
                            Selected_MsgIndx = 0;
                            break;
                        case "Radio_Err":
                            string Err_msg = data["Error"].ToString();
                            Log.error(Err_msg);
                            Handle_Error_Reset();
                            break;
                        case "Error_Sel_User":
                            isSelMode = false;
                            Selected_PlayerIndx = 0;
                            Radio_ScreenUpdateInternal("+Vol", "-Vol", "SelU", "", "", Radio_CommunityName, "", "", "");
                            Update_GUI();
                            string e1_message = data["message"].ToString();
                            showAlertInternal(e1_message);
                            break;
                        case "Sel_User":
                            string DiscordID = data["DiscordID"].ToString();
                            string DiscordName = data["DiscordName"].ToString();
                            string DiscordUserName = data["DiscordUserName"].ToString();
                            Show_SelectedPlayer(DiscordName, DiscordID, DiscordUserName);
                            break;
                        case "Notification":
                            string message = data["message"].ToString();
                            Screen.ShowNotification(message);
                            break;
                        case "Radio_Notifcation":
                            string radiomsg = data["message"].ToString();
                            showAlertInternal(radiomsg);
                            break;
                        case "Server_LostConn":
                            isInit = false;
                            isRadioActive = false;
                            isConnnected = false;
                            showAlertInternal("CONN FAULT");
                            break;
                        case "Authenticated":
                            isInit = true;
                            isRadioActive = true;
                            string CommunityName = data["CommunityName"].ToString();
                            int MaxChannels = Convert.ToInt32(data["MaxChannels"]);
                            Radio_MaxChannels = MaxChannels;
                            Radio_CommunityName = CommunityName;
                            isConnnected = true;
                            isInit = true;
                            isRadioActive = true;
                            Screen.ShowNotification("Connected to Radio Towers");
                            isAutherized_Setup();
                            break;
                        case "priority_active":
                            showAlertInternal("PANIC");
                            break;
                        case "Assign_Channel":
                            string currchannel = data["Channel"].ToString();
                            CurrChannelName = currchannel;
                            Update_GUI();
                            break;
                        case "Authenticating":
                            Screen.ShowNotification("Authenticating with Radio Servers");
                            break;
                        case "Radio_MaxUpdate":
                            int MaxChannels2 = Convert.ToInt32(data["MaxChannels"]);
                            Radio_MaxChannels += MaxChannels2;
                            if(Radio_MaxChannels >= 1)
                            {
                                SwitchChannel();
                            }
                            if(Radio_MaxChannels <= 0)
                            {
                                Screen.ShowNotification("Radio System is Offline due to no avalible channels");
                                PowerOff();
                            }
                            break;
                        case "Auth_Error":
                            String error2 = data["error"].ToString();
                            Log.debug("Server Auth Failed");
                            Log.error(error2);
                            powerOffInternal();
                            isRadioActive = false;
                            isInit = false;
                            CurrChannel = 0;
                            MaxChannels = 0;
                            break;
                    }
                }catch(Exception e)
                {
                    Error_Post(e);
                }
                
            });

            Vehicle_Check();
        }


        [Tick]
        public async Task OnTick()
        {
            await Delay(2000);
        }

        private async Task Vehicle_Check()
        {
            while (true)
            {
                if ((LocalPlayer.Character.IsInVehicle()))
                {
                    if(!isinVeh)
                    {
                        setModel("Motorola-E5");
                        isinVeh = true;
                    }
                }
                else
                {
                    if(isinVeh)
                    {
                        setModel("APX8000");
                        isinVeh = false;
                    }
                }
                await BaseScript.Delay(100);
            }
        }
        public void isAutherized_Setup()
        {
            try
            {
                isInit = true;
                isRadioActive = true;
                setModelInternal("APX8000");
                openInternal();
                Radio_ScreenUpdateInternal("+Vol", "-Vol", "SelU", "", "", Radio_CommunityName, "", "", "");
                RadioLNUpdateInternal(Radio_CommunityName, "CONNECTING", "", "");
                isSystemMessagingActive = true;
                SwitchChannel();
                return;

            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }

        [EventHandler("radioInternal:btnPress")]
        private void onRadioBtnPress(string buttonID)
        {
            try
            {
                if (!isRadioActive && !(buttonID == "power"))
                {
                    return;
                }
                switch (buttonID)
                {
                    case "ChUp":
                        if (isDevMode)
                        {
                            Log.debug("Channel Up Pressed");
                        }
                        SwitchChannel();
                        break;
                    case "btn1":
                        if (!isSelMode)
                        {
                            if (!isViewMsg)
                            {
                                Up_Vol();
                            }
                            else
                            {
                                if (isViewMsg)
                                {
                                    View_Messages();
                                }
                            }
                        }
                        else
                        {
                            if (!isViewMsg)
                            {
                                Select_Player();
                            }
                        }
                        break;
                    case "btn2":
                        if (!isViewMsg)
                        {
                            if (!isSelMode)
                            {
                                Lower_Vol();
                            }
                            else
                            {
                                Join_CreateTempChannel();
                            }
                        }
                        break;
                    case "btn3":
                        if (!isViewMsg)
                        {
                            if (isDevMode)
                            {
                                Log.debug("Button 3 Pressed");
                            }
                            if (!isSelMode)
                            {
                                Select_Player();
                            }
                            if (isSelMode)
                            {
                                Select_Player_Trigger_Event(0);
                            }
                        }
                        break;
                    case "btn4":
                        if (isDevMode)
                        {
                            Log.debug("Button 4 Pressed");
                        }
                        No_Func();
                        break;
                    case "btn5":
                        if(isDevMode)
                        {
                            Log.debug("Button 5 Pressed");
                        }
                        break;
                    case "btnDown":
                        if (isDevMode)
                        {
                            Log.debug("Button Down Pressed");
                        }
                        No_Func();
                        break;
                    case "btnUp":
                        if (isDevMode)
                        {
                            Log.debug("Button Up Pressed");
                        }
                        No_Func();
                        break;
                    case "btnLeft":
                        if (isDevMode)
                        {
                            Log.debug("Button Left Pressed");
                        }
                        No_Func();
                        break;
                    case "btnRight":
                        if (isDevMode)
                        {
                            Log.debug("Button Right Pressed");
                        }
                        if (!isViewMsg & !isinVeh)
                        {
                            isViewMsg = true;
                            View_Messages();
                        }
                        else
                        {
                            No_Func();
                        }
                        break;
                    case "emergency":
                        Log.debug("Emergency Button Pressed");
                        Trigger_Priority();
                        break;
                    case "power":
                        Log.debug("Power Button Pressed");
                        PowerOff();
                        break;
                    case "home":
                        if(isDevMode)
                        {
                            Log.debug("Home Button Pressed");
                        }
                        if (isSelMode)
                        {
                            isSelMode = false;
                            Selected_PlayerIndx = 0;
                            Radio_ScreenUpdateInternal("+Vol", "-Vol", "SelU", "", "", Radio_CommunityName, "", "", "");
                            Update_GUI();
                            showAlertInternal("RESET");
                        }
                        else
                        {
                            isViewMsg = false;
                            isSelMode = false; 
                            Selected_PlayerIndx = 0;
                            Radio_ScreenUpdateInternal("+Vol", "-Vol", "SelU", "", "", Radio_CommunityName, "", "", "");
                            Update_GUI();
                            showAlertInternal("RESET");
                        }
                        break;
                    default:
                        if(isDevMode)
                        {
                            Log.debug("Unknown Button Pressed");
                            Log.debug("Button ID: " + buttonID);
                        }
                        No_Func();
                        break;
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }
        
        public void View_Messages()
        {
            try
            {
                Selected_MsgIndx += 1;
                var data = new
                {
                    msgType = "Select_Message",
                    indx = Selected_MsgIndx
                };
                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }
        public void Handle_Error_Reset()
        {
            try
            {
                showAlertInternal("INT ERR");
                Screen.ShowNotification("Your Radio Has Occured an error, It well automatically power off.");
                PowerOff();
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }
        public void Select_Player_Trigger_Event(int type)
        {
            try
            {
                switch(type)
                {
                    case 0:
                        var data = new
                        {
                            msgType = "Sel_UserAlrt",
                            indx = Selected_PlayerIndx
                        };
                        SEND_NUI(data);
                    break;  
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }
        public void Select_Player()
        {
            try
            {
                isSelMode = true;
                Selected_PlayerIndx += 1;
                var data = new
                {
                    msgType = "Switch_PlayerList",
                    indx = Selected_PlayerIndx
                };
                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void Join_CreateTempChannel()
        {
            try
            {
                isSelMode = true;
                var data = new
                {
                    msgType = "JTC",
                    indx = Selected_PlayerIndx
                };
                SEND_NUI(data);
            }
            catch (Exception e)
            {
                Error_Post(e);
            }
        }
        public void Show_SelectedPlayer(String Name, String ID, String UserName)
        {
            try
            {
                showAlertInternal("LOADING");
                Radio_ScreenUpdateInternal("->", "JTC", "ALR", "", "", "SEL USER", "", "", ""); //JTC = JOIN/CREATE TEMP RADIO CHANNEL GROUP
                RadioLNUpdateInternal("SEL USER", Name, "", "");

            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }
        [Command("volUP")]
        public void Up_Vol()
        {
            if (Curr_Volume == 100)
            {
                showAlertInternal("MAX VOL");
            }
            else
            {
                if (Curr_Volume + 10 >= 100)
                {
                    Curr_Volume = 100;
                    showAlertInternal("MAX VOL");
                    var data = new
                    {
                        msgType = "setVol",
                        volume = Curr_Volume
                    };
                    SEND_NUI(data);
                }
                else
                {
                    Curr_Volume = Curr_Volume + 10;
                    showAlertInternal("VOL %"+Curr_Volume.ToString());
                    var data = new
                    {
                        msgType = "setVol",
                        volume = Curr_Volume
                    };
                    SEND_NUI(data);
                }

            }
        }
        [Command("volDOWN")]
        public void Lower_Vol()
        {
            try
            {
                if(Curr_Volume -10 < 0)
                {
                    Curr_Volume = 0;
                    showAlertInternal("MUTED VOL");
                    var data = new
                    {
                        msgType = "setVol",
                        volume = Curr_Volume
                    };
                    SEND_NUI(data);
                }
                else
                {
                    Curr_Volume = Curr_Volume - 10;
                    showAlertInternal("VOL %" + Curr_Volume.ToString());
                    var data = new
                    {
                        msgType = "setVol",
                        volume = Curr_Volume
                    };
                    SEND_NUI(data);
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }
        public void No_Func()
        {
            try
            {
                showAlertInternal("FUNC DISABLED");
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }


        public void Update_GUI()
        {
            try
            {
                isSelMode = false;
                Selected_PlayerIndx = 0;
                Radio_ScreenUpdateInternal("+Vol", "-Vol", "SelU", "", "", Radio_CommunityName, "", "", "");
                RadioLNUpdateInternal(Radio_CommunityName, CurrChannelName, "", CurrChannel.ToString());
                setVisibilityInternal(true);
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void PowerOff()
        {
            try
            {
                isRadioActive = false;
                isRadioPTT = false;
                isInit = false;
                CurrChannel = 0;
                powerOffInternal();
                var data = new
                {
                    msgType = "Disconnect"
                };
                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }
        public void Set_IDs(string discord, string license)
        {
            try
            {
                Curr_DiscordID = discord;
                Curr_License = license;
                var data = new
                {
                    msgType = "init",
                    discord = discord,
                    license = license
                };
                SEND_NUI(data);
            }catch(Exception e)
            {
                Error_Post(e);
            }

        }
        public void SetID(string discord, string license, string ckey)
        {
            try
            {
                Curr_DiscordID = discord;
                Curr_License = license;
                Log.debug("Discord ID: " + Curr_DiscordID);
            }catch(Exception e)
            {
                Error_Post(e);
            }

        }

        [Command("+focusradio")]
        public void FocusRadio()
        {
            try
            {
                if (isFocused)
                {
                    unfocusInternal();
                    isFocused = false;
                }
                else
                {
                    focusInternal();
                    isFocused = true;
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }
        
        [Command("radio")]
        public void RadioCommand()
        {
            try
            {
                if (!isInit)
                {
                    TriggerServerEvent("LuciferSystems:initradio");
                }
                if (isRadioActive)
                {
                    isRadioActive = true;
                    openInternal();
                }
                else
                {
                    isRadioActive = true;
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }
        [Command("debug_enable")]

        public void D_enable()
        {
            try
            {
                showAlertInternal("DM ACTIVE");
                isDevMode = true;
                var data = new
                {
                    msgType = "Enable_Debug"
                };

                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }
        
        [Command("debug_disable")]

        public void D_disable()
        {
            try
            {
                showAlertInternal("DM DISABLED");
                isDevMode = false;
                var data = new
                {
                    msgType = "Disable_Debug"
                };

                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void SwitchChannel()
        {
            try
            {
                if (isInit && isRadioActive)
                {
                    CurrChannel++;
                    if (CurrChannel > Radio_MaxChannels)
                    {
                        CurrChannel = 1;
                    }
                    var data = new
                    {
                        msgType = "setChannel",
                        channel = CurrChannel
                    };
                    SEND_NUI(data);
                }
                else
                {
                    Screen.ShowNotification("Radio is not active");
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void Trigger_Priority()
        {
            try
            {
                Vector3 playerCoords = GetEntityCoords(PlayerPedId(), false);
                var data = new
                {
                    msgType = "priority_active",
                    x = playerCoords.X,
                    y = playerCoords.Y,
                    z = playerCoords.Z
                };
                Drawgps(playerCoords.X.ToString(), playerCoords.Y.ToString(), playerCoords.Z.ToString());
                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void Send_Location()
        {
            try
            {
                if (isConnnected && isInit && isRadioActive)
                {
                    Vector3 playerCoords = GetEntityCoords(PlayerPedId(), false);
                    var data = new
                    {
                        msgType = "Update_Location",
                        x = playerCoords.X,
                        y = playerCoords.Y,
                        z = playerCoords.Z
                    };
                    SEND_NUI(data);
                }
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }
        public void Clear_Priority()
        {
            try
            {
                var data = new
                {
                    msgType = "priority_disable"
                };
                SEND_NUI(data);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void Show_Msg(String Type, String message)
        {
            try
            {
                Radio_ScreenUpdateInternal("-->", "", "", "", "", "", "", "", "");
                Radio_ScreenUpdate_NewMessage(Type, message);
            }
            catch(Exception e)
            {
                Error_Post(e);
            }
        }

        public void Disable_Priority()
        {
            try
            {
                var data = new
                {
                    msgType = "priority_disable"
                };
                SEND_NUI(data);
            }
            catch (Exception e)
            {
                Error_Post(e);
            }
        }


        public void SEND_NUI(Object d)
        {
            if (isDevMode)
            {
                Debug.WriteLine("Sending NUI Event: " + d.ToString());
            }
            API.SendNuiMessage(JsonConvert.SerializeObject((object)d));
        }


        [Command("+ptt")]
        public void PTTActive()
        {
            try
            {
                if (isConnnected)
                {
                    Update_GUI();
                    doRadioAnimation(true);
                    RadioLNUpdateInternal("TALKING", CurrChannelName, "", CurrChannel.ToString());
                    isRadioPTT = true;
                    pttInternal(true);
                    var data = new
                    {
                        msgType = "setPTT",
                        status = true
                    };
                    SEND_NUI(data);
                }
                else
                {
                    showAlertInternal("CONN FAULT");
                }
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }

        [Command("-ptt")]
        public void PTTDisable()
        {
            try
            {
                isRadioPTT = false;
                RadioLNUpdateInternal(Radio_CommunityName, CurrChannelName, "", CurrChannel.ToString());
                showAlertInternal("CLR");
                BaseScript.TriggerEvent("radioInternal:ptt", (object)isRadioPTT);
                doRadioAnimation(false);
                pttInternal(false);
                var data = new
                {
                    msgType = "setPTT",
                    status = false
                };
                SEND_NUI(data);
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }




        private void doRadioAnimation(bool pttState)
        {
            try
            {
                if (pttState)
                    API.TaskPlayAnim(LocalPlayer.Character.Handle, "random@arrests", LocalPlayer.IsAiming ? "radio_chatter" : "generic_radio_enter", 8f, 2f, -1, 50, 2f, false, false, false);
                else
                    LocalPlayer.Character.Task.ClearAll();
            }catch(Exception e)
            {
                Error_Post(e);
            }
        }


        public void Error_Post(Exception ex)
        {
            Log.error("PUBLISHING ERROR TO DISCORD");
            var data = new
            {
                msgType = "error_rec",
                hash = ex.GetHashCode(),
                error = ex.ToString()
            };

            SEND_NUI(data);

        }
    }
}
//THIS RADIO IS CREATED BY lucifer6661771!!