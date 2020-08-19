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
  // Parameter destructuring!
  .then(({ token }) => {
    tokenService.setToken(token);
  });
  // the above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
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
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function favoritePokemon(id, type, pokemonName) {
  return fetch(`${BASE_URL}${id}/${type}/${pokemonName}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()}
  }, {mode: 'cors'})
  .then(res => res.json());
}

export default {
  signup,
  getUser,
  logout,
  login,
  favoritePokemon
};