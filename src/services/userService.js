import tokenService from '../services/tokenService';
const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    return res.json();
  })
  .then(json => {
    if(json.token) return json;
    throw new Error(`${json.err || json.message}`)
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
  .then(res => res.json())
  .then(json => {
    console.log(json)
    if(json.token) return json;
    throw new Error(`${json.err || json.message}`)
  })
  .then(({token}) => tokenService.setToken(token));
}

function favoritePokemon(user, type, pokemonName) {
  return fetch(`${BASE_URL}${user._id}/${type}/${pokemonName}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
    body: JSON.stringify(user)
  }, {mode: 'cors'})
  .then(res => res.json())
  .then(json => {
    if(json.token) {
      tokenService.setToken(json.token);
      return json.newUser
    }
    throw new Error(`${json.err || json.message}`)
  })
} 

function unFavoritePokemon(user, type, pokemonName) {
  return fetch(`${BASE_URL}un/${user._id}/${type}/${pokemonName}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()},
    body: JSON.stringify(user)
  }, {mode: 'cors'})
  .then(res => res.json())
  .then(json => {
    if(json.token) {
      tokenService.setToken(json.token);
      return json.newUser
    }
    throw new Error(`${json.err || json.message}`)
  })
}

const functions = {
  signup,
  getUser,
  getUserById,
  logout,
  login,
  favoritePokemon,
  unFavoritePokemon,
};

export default functions