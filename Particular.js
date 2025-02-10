MAXPOKEMON = 151;
const pokemonImage = document.getElementById('pokemonImage');
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const SATK = document.getElementById("SATK");
const pokeInfo = document.getElementById("infoPokemon")



const HP = document.getElementById("HP");
const ATK = document.getElementById("ATK");
const DEF = document.getElementById("DEF");
const SATKi = document.getElementById("SATKi");
const SDEF = document.getElementById("SDEF");
const SFD = document.getElementById("SFD");


document.addEventListener('DOMContentLoaded', async () => {
    const search_params = new URLSearchParams(window.location.search);
    const id = search_params.get('id');
    if (!id || isNaN(id)) {
        console.error('No valid ID parameter found in URL');
        return;
    }
    console.log('ID value:', id);
    
    const [pokemon, pokemonSpecies] = await get_pokemon(id);
    if (!pokemon || !pokemonSpecies) return;
    // console.log(`${pokemon.id}`);

    const pokemonImage = document.querySelector('.pokemonImage');
    const weight = document.getElementById('weight');
    const height = document.getElementById('height');
    const SATK = document.getElementById('SATK');
    const pokeInfo = document.getElementById('infoPokemon');

    pokemonImage.innerHTML += `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="pokemonImage">`;
    weight.innerHTML += `
    ${pokemon.weight}
    `
    height.innerHTML += `
    ${pokemon.height}
    `
    SATK.innerHTML = `
    ${pokemon.abilities[0].ability.name}
    special Ability
    ${pokemon.abilities[1].ability.name}
    `
    pokeInfo.innerHTML = `
    ${pokemonSpecies.flavor_text_entries[0].flavor_text}
    `
    HP.value = pokemon.stats[0].base_stat;
    ATK.value = pokemon.stats[1].base_stat;
    DEF.value = pokemon.stats[2].base_stat;
    SATKi.value = pokemon.stats[3].base_stat;
    SDEF.value = pokemon.stats[4].base_stat;
    SFD.value = pokemon.stats[5].base_stat;
});


function rgbaFromHex(hexColour) {
    return [
        parseInt(hexColour.slice(1,3), 16),
        parseInt(hexColour.slice(3,5), 16),
        parseInt(hexColour.slice(5,7), 16)
    ].join(", ");
};


function changePokemon(direction) {
    let id = Number(new URLSearchParams(window.location.search).get('id'));
    if (isNaN(id)) {
        console.error('Invalid ID parameter');
        return;
    }
    if (direction === "left") {
        if (id > 1) {
            id -= 1;
        } else {
            console.log("Can't go down any more :(");
            return;
        }
    } else if (direction === "right") {
        if (id < MAXPOKEMON) {
            id += 1;
        } else {
            console.log("Can't go up any more :(");
            return;
        }
    }
    window.location.assign(`./SpecificPokemon.html?id=${id}`);
}

async function get_pokemon(id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => 
                response.json()
            ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((response) => 
                response.json()
            )
        ]);
        console.log('Pokemon:', pokemon);
        console.log('Pokemon Species:', pokemonSpecies);
        return [pokemon, pokemonSpecies];
    } catch (error) {
        console.error('Error fetching pokemon data:', error);
    }
}








// await get_pokemon(id)  <-- removed the global call as it is now inside the DOMContentLoaded listener.

const typeColours = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    dark: "#EE99AC",
};
// Removed redundant image update from global scope.


// Removed duplicate update since pokemon is not defined here.


