const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export function getAllPokemon() {
    return fetch (`${BASE_URL}?limit=807`, {mode: 'cors'})
    .then(res => res.json());
}

export function getPokemonDetails(idx) {
    return fetch(`${BASE_URL}${idx}`, {mode:'cors'})
    .then(res => res.json());
}

export function getKantoPokemon() {
    return fetch(`${BASE_URL}?limit=151`, {mode:'cors'})
    .then(res => res.json());
}

export function getJohtoPokemon() {
    return fetch(`${BASE_URL}?limit=100&offset=151`, {mode:'cors'})
    .then(res => res.json());
}

export function getHoennPokemon() {
    return fetch(`${BASE_URL}?limit=135&offset=251`, {mode:'cors'})
    .then(res => res.json());
}

export function getSinnohPokemon() {
    return fetch(`${BASE_URL}?limit=107&offset=386`, {mode:'cors'})
    .then(res => res.json());
}

export function getUnovaPokemon() {
    return fetch(`${BASE_URL}?limit=156&offset=493`, {mode:'cors'})
    .then(res => res.json());
}

export function getKalosPokemon() {
    return fetch(`${BASE_URL}?limit=72&offset=649`, {mode:'cors'})
    .then(res => res.json());
}

export function getAlolaPokemon() {
    return fetch(`${BASE_URL}?limit=86&offset=721`, {mode:'cors'})
    .then(res => res.json());
}
