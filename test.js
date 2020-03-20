const test = require('ava');
const http = require('http');

function request(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            res.on('data', (buffer) => {
                resolve(buffer.toString('utf8'));
            });
        }).on('error', (e) => {
            reject(e);
        });
    });
}

test('home page should contain a form', async t => {
    // condition de passage: la page contient un formulaire HTML
    // plus concretement: la reponse à HTTP `GET /` doit contenir `<form`
    const html = await request('http://localhost:3000/');
    t.regex(html, /<form/);
});