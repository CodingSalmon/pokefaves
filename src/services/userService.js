import tokenService from '../services/tokenService';
const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
  })
  .then(({ token }) => {
    tokenService.setToken(token);
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function getUserById(id) {
  return fetch(BASE_URL + id)
  .then(res => res.json())
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function favoritePokemon(user, type, pokemonName) {
  return fetch(`${BASE_URL}${user._id}/${type}/${pokemonName}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
    body: JSON.stringify(user)
  }, {mode: 'cors'})
  .then(res => res.json());
}

function unFavoritePokemon(user, type, pokemonName) {
  return fetch(`${BASE_URL}un/${user._id}/${type}/${pokemonName}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
    body: JSON.stringify(user)
  }, {mode: 'cors'})
  .then(res => res.json());
}

export default {
  signup,
  getUser,
  getUserById,
  logout,
  login,
  favoritePokemon,
  unFavoritePokemon,
};