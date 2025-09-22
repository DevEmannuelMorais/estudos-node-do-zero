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

// import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();

// const database = new DataBaseMemory();
const database = new DataBasePostgres();

server.listen({
    port: 3000,
    host: '0.0.0.0'
});


server.post('/videos', async (request, reply) => {

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

    console.log(title, description, duration);

    await database.create({
        title: title,
        description: description,
        duration: duration
    });

    return reply.status(201).send('Video created successfully');
});


server.get('/videos', async (request, reply) => {

    // o Campo search é opcional
    const { search } = request.query;

    const videos = await database.list(search);

    return reply.send(videos).status(200);
});


server.put('/videos/:id', async (request, reply) => {

    const { id } = request.params;
    const { title, description, duration } = request.body;

    await database.update(id, {
        title,
        description,
        duration
    });

    return reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply) => {

    const { id } = request.params;

    await database.delete(id);

    return reply.status(204).send();
});    