exports('NUISendCharacters', function(characters)
	print('getting characters?')
	NUISendCharacters(characters)
end)

exports('NUISendClothing', function(clothes)
	NUISendClothing(clothes)
end)

exports('NUISendClothingValue', function(clothingValue)
	print('setting clothing value')
	print('clothes value', clothingValue)
	SendNUIMessage({
		action = 'setClothesValue',
		data = clothingValue
	})
end)

Citizen.CreateThread(function()
	SendNUIMessage({
		action = 'setCharacterVisibility',
		data = true
	})
end)

RegisterCommand('clothes:close', function()
	SetNuiFocus(false);
	SendNUIMessage({
		action = 'setClothesVisibility',
		data = false
	})
	exports['chip-clothing']:CloseClothing()
end)

RegisterNUICallback('ui:selectCharacter', function(data, cb)
	cb({})
	TriggerServerEvent('character:selectCharacter', data);
	SendNUIMessage({
		action = 'setCharacterVisibility',
		data = false
	})
	SetNuiFocus(false)
end)

RegisterNUICallback('clothes:changeClothes', function(data, cb)
	cb({})
	exports['chip-clothing']:ChangeClothes(data)
end)

RegisterNUICallback('clothes:updateClothes', function(data, cb)
	cb({})
	exports['chip-clothing']:UpdateClothes(data)
end)

RegisterNUICallback('clothes:closeMenu', function(data, cb)
	cb({})
	SetNuiFocus(false);
	SendNUIMessage({
		action = 'setClothesVisibility',
		data = false
	})
	exports['chip-clothing']:CloseClothing()
end)