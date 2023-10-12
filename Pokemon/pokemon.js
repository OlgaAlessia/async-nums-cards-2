const POKEMON_API_URL = "https://pokeapi.co/api/v2";
const POKEMON_IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";


async function part1() {
    let data = await get(`${POKEMON_API_URL}/pokemon/?limit=100&offset=0`);
    console.log(data);
}

async function catchThem() {
    try{
        const pockemonData = await get(`${POKEMON_API_URL}/pokemon?limit=100&offset=0`);
        
        console.log(pockemonData);
        const dict_pokemons = {}
        for(let i = 0; i < pockemonData.results.length; i++) {
            let pokemon = {"name": pockemonData.results[i].name, "url": pockemonData.results[i].url }
            dict_pokemons[i] = pokemon;
        }
    } catch(e) {
        console.log("Problem Catching the Pokemon! ", e)
    }
}

$(document).on("click", "#btnPokemon", catchPokemons);
let $arena = $("#arena");


async function catchPokemons() {
    $arena.empty();
    try {
        for(let i = 0; i < 3; i++) {
            let value = Math.floor(Math.random() * 1000 - 1);
            const pokemon = new Pokemon(value);
            await pokemon.getInfo();

            $arena.append(createPokemonCard(pokemon.name, pokemon.image, pokemon.desc));
        }
    } catch (e) {
        console.log("Problem with the Pokemon!", e);
    }
}

class Pokemon {
    constructor(id){
        this.id = id;
    }

    async getInfo(){
        let resp = await axios.get(`${POKEMON_API_URL}/pokemon/${this.id}`)
        this.name = resp.data.name;
        this.image = resp.data.sprites.front_default;
        let respSpecies = await axios.get(`${POKEMON_API_URL}/pokemon-species/${this.id}`);
        this.desc = "";
        for(let i = 0; i < respSpecies.data.flavor_text_entries.length; i++) {
            if(respSpecies.data.flavor_text_entries[i].language.name == "en" ){
                this.desc = respSpecies.data.flavor_text_entries[i].flavor_text;
                break;
            }
        }
    }
}

function createPokemonCard(namePokemon, url, description){
    return `
      <div class="card">
        <h2>${namePokemon}</h2>
        <img src=${url} />
        <p>${description}</p>
      </div>`;
}