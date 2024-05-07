fx_version 'bodacious'
name 'Lucifer Systems Radio'
description 'Lucifer Systems Radio'
author 'Matthew J.'
version 'v2.0.0'
url 'https://lucifersapi.live'
games { 'gta5' }
client_scripts {
    'QB_client.lua',
    'LuciferSystems.Client.net.dll'
}

files {
    'Newtonsoft.Json.dll',
    'nui/*.html',
    'nui/*.js'
}

server_scripts {
'LuciferSystems.Server.net.dll'
}
ui_page 'nui/client.html'
