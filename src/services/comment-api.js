import tokenService from "../services/tokenService";
const BASE_URL = "/api/comments/";

export function getComments(pokemonName) {
  return fetch(`${BASE_URL}${pokemonName}`, { mode: "cors" }).then((res) =>
    res.json()
  );
}

export function createComment(formData) {
  return fetch(
    `${BASE_URL}${formData.pokemonName}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + tokenService.getToken(),
      },
      body: JSON.stringify(formData),
    },
    { mode: "cors" }
  ).then((res) => res.json());
}

export function removeComment(id) {
  return fetch(
    `${BASE_URL}${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + tokenService.getToken(),
      },
    },
    { mode: "cors" }
  ).then((res) => res.json());
}
