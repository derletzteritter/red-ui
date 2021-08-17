function NUISendCharacters(characters)
	print('characters', characters)
	SetNuiFocus(true, true);
	SendNUIMessage({
		action = 'setCharacterVisibility',
		data = true
	})
	SendNUIMessage({
		action = 'setCharacters',
		data = characters
	})
end

function NUISendClothing(clothes)
	SetNuiFocus(true, true);
	SendNUIMessage({
		action = 'setClothesVisibility',
		data = true
	})
	SendNUIMessage({
		action = 'setClothes',
		data = clothes
	})
end