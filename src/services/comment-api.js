const BASE_URL = '/api/comments';

export function create(comment) {
    return fetch(BASE_URL, {
        method:'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(comment)
    }, {mode:'cors'})
    .then(res => res.json());
};

export function pokemonComments(comment) {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(comment)
    }, {mode:'cors'})
    .then(res => res.json());
};