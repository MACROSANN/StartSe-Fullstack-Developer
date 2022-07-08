import express from 'express';
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORTA = process.env.PORTA || 3000;
let users = [
    { id: 1, name: 'joao santana', age: 52 },
    { id: 2, name: 'jacqueline santana', age: 51 },
];

app.use(express.json());

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Trabalhando com servidor express.</h1>');
});

app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const user = users.find(user => {
        return (user.id === Number(userId))
    })
    return response.send(user);
});

app.post('/users', (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, responde) => {
    const userId = request.params.userId;
    const updateUsers = request.body;

    users = users.map(user => {
        if (Number(userId) === user.id) {
            return updateUsers;
        }

        return user;
    });

    return responde.send(updateUsers);
});

app.delete('/users/:userId', (request, responde) => {
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId));

    return responde.status(StatusCodes.NO_CONTENT).send();
});