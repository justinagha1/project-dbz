/*
Author: Justin
This is the JavaScript for our page about DBZ
*/

const baseUrl = "https://dragonball-api.com/api/characters";
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters();
});


function fetchCharacters(page = 1) {
    fetch(`${baseUrl}?page=${page}&limit=10`)
        .then(response => response.json())
        .then(data => {
            displayCharacters(data.items);
            updatePagination(data.links);
        });
}

function displayCharacters(characters) {
    const characterList = document.getElementById('characterList');
    characterList.innerHTML = '';

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.textContent = character.name;
        characterDiv.onclick = () => fetchCharacterDetails(character.id);
        characterList.appendChild(characterDiv);
    });
}

function updatePagination(links) {

    document.querySelector("button[onclick='navigate(\"first\")']").disabled = !links.first;
    document.querySelector("button[onclick='navigate(\"previous\")']").disabled = !links.previous;
    document.querySelector("button[onclick='navigate(\"next\")']").disabled = !links.next;
    document.querySelector("button[onclick='navigate(\"last\")']").disabled = !links.last;
}

function fetchCharacterDetails(id) {
    fetch(`${baseUrl}/${id}`)
        .then(response => response.json())
        .then(character => {
            const detailsDiv = document.getElementById('characterDetails');
            detailsDiv.innerHTML = `
                <h2>${character.name}</h2>
                <p>Race: ${character.race}</p>
                <p>Ki: ${character.ki}</p>
                <p>Description: ${character.description}</p>
                <p>Origin Planet: ${character.originPlanet.name}</p>
                <h3>Transformations</h3>
                <ul>${character.transformations.map(t => `<li>${t.name}</li>`).join('')}</ul>
            `;
        });
}

function filterCharacters() {
    const race = document.getElementById('raceSelect').value;
    const affiliation = document.getElementById('affiliationSelect').value;

    fetch(`${baseUrl}?race=${race}&affiliation=${affiliation}`)
        .then(response => response.json())
        .then(data => {
            displayCharacters(data);
        });
}

function navigate(direction) {
    if (direction === 'first') currentPage = 1;
    else if (direction === 'previous' && currentPage > 1) currentPage--;
    else if (direction === 'next') currentPage++;
    else if (direction === 'last') currentPage = Number.MAX_SAFE_INTEGER;

    fetchCharacters(currentPage);
}
