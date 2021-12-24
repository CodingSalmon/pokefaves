import tokenService from "../services/tokenService";
const BASE_URL = "/users/";

function signup(user) {
  return fetch(BASE_URL + "signup", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.token) return json;
      throw new Error(`${json.err || json.message}`);
    })
    .then(({ token }) => {
      tokenService.setToken(token);
    });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function getUserById(id) {
  return fetch(BASE_URL + id).then((res) => res.json());
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(
    BASE_URL + "login",
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "https://localhost:5001",
      }),
      body: JSON.stringify(creds),
    }
    // { mode: "cors" }
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.token) return json;
      throw new Error(`${json.err || json.message}`);
    })
    .then(({ token }) => tokenService.setToken(token));
}

function handleFavorite(favorites, type, pokemonName) {
  return fetch(
    `${BASE_URL}fav/${type}/${pokemonName}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        // prettier-ignore
        "Authorization": "Bearer " + tokenService.getToken(),
      },
      body: JSON.stringify(favorites),
    },
    { mode: "cors" }
  )
    .then((res) => res.json())
    .then((json) => {
      if (json.token) {
        tokenService.setToken(json.token);
        return;
      }
      throw new Error(`${json.err || json.message}`);
    });
}

const functions = {
  signup,
  getUser,
  getUserById,
  logout,
  login,
  handleFavorite,
};

export default functions;
