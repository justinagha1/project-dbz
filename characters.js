/*
Author: Justin
This is teh JavaScript for our page about DBZ
*/

// variables
const characterListUrl = "https://dragonball-api.com/api/characters";
const characterList = document.getElementById("character")
// when the page loads
window.addEventListener("load", updateCharacterList )

// retrieve the list of all characters from API
async function getCharacterList() {
  return fetch(characterListUrl).then(response => response.json())};

// add characters to drop down list
  function updateCharacterList() {
    getCharacterList().then(function(data) {

// get character name
	for (elemnet in data.message) {
// append to the select list
    let option = createOption (elemnet);
    characterList.appendChild(option);
		    }
    	}
	);
}

function createOption (text) {
  let option = document.createElement("option");
  option.textContent = text;
  return option;
}
