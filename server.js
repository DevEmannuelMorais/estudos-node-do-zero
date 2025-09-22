// import { createServer } from "node:http";


// const server = createServer((request, response) => {
// response.write('oi');
// response.wirte('teste');
// response.write('oi');
// response.write('oi');


//     return response.end();
// });

// server.listen(3000);

import fastify from "fastify";

import { DataBaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DataBaseMemory();

server.listen({
    port: 3000,
    host: '0.0.0.0'
});


server.post('/videos', (request, reply) => {

    const { title, description, duration } = request.body;

    if (!title) {
        return reply.status(400).send({ error: 'Title is required' });
    }

    if (!description) {
        return reply.status(400).send({ error: 'Description is required' });
    }

    if (!duration) {
        return reply.status(400).send({ error: 'Duration is required' });
    }

    database.create({
        title: title,
        description: description,
        duration: duration
    });

    return reply.status(201).send();
});


server.get('/videos', (request, reply) => {

    // o Campo search é opcional
    const { search } = request.query;

    const videos = database.list(search);

    return reply.send(videos).status(200);
});


server.put('/videos/:id', (request, reply) => {

    const { id } = request.params.id;
    const { title, description, duration } = request.body;

    database.update(id, {
        title,
        description,
        duration
    });

    return reply.status(204).send();
});

server.delete('/videos/:id', (request, reply) => {

    const { id } = request.params.id;

    database.delete(id);

    return reply.status(204).send();
});    