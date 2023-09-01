local InTextUI = false
local InSetings = false

RegisterNetEvent('zeripxzz-textui:ShowUI')
AddEventHandler('zeripxzz-textui:ShowUI', function(bind, title, msg)	
	ShowUI(bind, title, msg)
end)

function ShowUI(bind, title, msg)
	if not InTextUI then
		InTextUI = true
		SendNUIMessage({
			action = 'ShowUI',
			bind = bind,
			title = title,
			msg = msg
		})
	end
end

RegisterNetEvent('zeripxzz-textui:HideUI')
AddEventHandler('zeripxzz-textui:HideUI', function()
	HideUI()
end)

function HideUI()
	if InTextUI then
		InTextUI = false
		SendNUIMessage({
			action = 'HideUI'
		})
	end
end

function ShowSetings()
	if not InSetings then
		InSetings = true
		SetNuiFocus(true, true)
		SendNUIMessage({
			action = 'ShowSetings'
		})
	end
end

function HideSetings()
	if InSetings then
		InSetings = false
		SetNuiFocus(false, false)
		SendNUIMessage({
			action = 'HideSetings'
		})
	end
end

RegisterCommand('setings', function()
	ShowSetings()
end)

RegisterNUICallback("HideSetings", function()
    HideSetings()
end)

-- exemple

RegisterCommand('textui', function ()
	exports['zeripxzz-textui']:ShowUI('E', 'Test', 'Press to access')
end)

RegisterCommand('closetextui', function ()
	exports['zeripxzz-textui']:HideUI()
end)