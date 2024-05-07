local QBCore = exports['qb-core']:GetCoreObject()
local PlayerData = QBCore.Functions.GetPlayerData()


AddEventHandler('onResourceStart', function(resource)
    if GetCurrentResourceName() == resource then
        PlayerData = QBCore.Functions.GetPlayerData()
        print(PlayerData.job.name)
        SendNUIMessage({
                msgType = 'setJob',
                Char_Job = PlayerData.job.name
        })
    end
end)

RegisterNetEvent('QBCore:Player:SetPlayerData', function(val)
    PlayerData = val

    SendNUIMessage({
        msgType = 'setJob',
        Char_Job = PlayerData.job.name
    })
end)