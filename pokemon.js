const MAXPOKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input")
const numberFilter = document.querySelector("#number")
const nameFilter = document.querySelector("#name")
const notFoundMessage = document.querySelector("#not-found-message")

let curPokemon = [];
let allPokemon = [];


function viewpokemon(id) {
    console.log(`${id}`)
    if (!id) return;
    window.location.assign(`./SpecificPokemon.html?id=${id}`);
}

function displayPokemon(curPokemon,allPokemon) {
    listWrapper.innerHTML = ''
    
    curPokemon.forEach(i => {
        const index = parseInt(i);
        // console.log(`${allPokemon[i].name}`)
        listWrapper.innerHTML += `
        <div class="list-item">
            <div>${allPokemon[i-1].name}</div>
            <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" alt="${allPokemon[i-1].name}">
            </div>
            <div>${i}</div>
        </div>`;
    });

}

function search() {
    curPokemon = []
    if (document.getElementById("number").checked) {
        allPokemon.forEach(pokemon => {
            if (pokemon.url.split("/")[6].startsWith(searchInput.value.toLowerCase())) {
                curPokemon.push(pokemon.url.split("/")[6])
            }
        });
    } else {
    allPokemon.forEach(pokemon => {
        if (pokemon.name.startsWith(searchInput.value.toLowerCase())) {
            curPokemon.push(pokemon.url.split("/")[6])
        }
    });
    }
    displayPokemon(curPokemon,allPokemon)

    if (curPokemon.length === 0) {

        notFoundMessage.style.display = "block";
    }
    else {
        notFoundMessage.style.display = "none";
    }
}




fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAXPOKEMON}`)
.then((response) => response.json())
.then((data) => {
    allPokemon = data.results;
    
    allPokemon.forEach((pokemon, index) => {
        const id = index + 1;
        listWrapper.innerHTML += `
            <div class="list-item" onclick="viewpokemon(${id})">
                <div>${pokemon.name}</div>
                <div>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${pokemon.name}">
                </div>
                <div>${pokemon.url.split("/")[6]}</div>
            </div>
        `;
    });
});


searchInput.addEventListener("keyup", search);

