const BASE_URL = '/api/comments/';

export function getComments() {
    return fetch(`${BASE_URL}`, {mode:'cors'})
    .then(res => res.json());
};

export function createComment(formData) {
    console.log(formData)
    return fetch(`${BASE_URL}${formData.pokemonName}`, {
        method:'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({msg: formData.msg})
    }, {mode:'cors'})
    .then(res => res.json());
};

export function deleteComment(id) {
    return fetch(`${BASE_URL}${id}`, {
        method:'DELETE'
    }, {mode:'cors'})
    .then(res => res.json());
};