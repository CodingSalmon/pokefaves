const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export function getAllPokemon() {
    return fetch (`${BASE_URL}?limit=807`, {mode: 'cors'})
    .then(res => res.json());
}

export function getPokemonDetails(pokemonName) {
    return fetch(`${BASE_URL}${pokemonName}`, {mode:'cors'})
    .then(res => res.json());
}
