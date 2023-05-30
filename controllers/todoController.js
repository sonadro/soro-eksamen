// imports & packages
const User = require('../models/User');
const Todo = require('../models/Todo');
const { jwtSecret } = require('../config.json');
const jwt = require('jsonwebtoken');

// controller
module.exports.todo_update = async (req, res) => {
    const todos = req.body.todos;
    const token = req.cookies.jwt;

    if (token) {
        // verifiser token
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                // bruker har ugyldig token
                res.send({
                    status: 'Du må logge inn på nytt',
                    code: 'userErr'
                });
            } else {
                // bruker er logget inn, finn todo-listen til brukeren
                const dbTodo = await Todo.findOne({ owner: decodedToken.id});

                if (!dbTodo) {
                    // brukeren har ingen todos fra før, lag nye
                    const document = await Todo.create({
                        items: todos,
                        owner: decodedToken.id
                    });

                    res.send({
                        status: 'Todos opprettet',
                        code: 'ok'
                    });
                } else {
                    // brukeren har todos fra før, oppdater de
                    await dbTodo.updateOne({
                        items: todos,
                        owner: decodedToken.id
                    });
                    
                    res.send({
                        status: 'Todos er oppdattert',
                        code: 'ok'
                    });
                };
            };
        });
    } else {
        // bruker er ikke logget inn
        res.send({
            status: 'Du er ikke logget inn',
            code: 'userErr'
        });
    };
};

module.exports.todo_getUserTodos = async (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        // verifiser token
        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                // brukeren er ikke logget inn
                res.send({
                    status: 'Du må logge inn på nytt',
                    code: 'userErr'
                });
            } else {
                // bruker er logget inn, send tilbake todos
                const todos = await Todo.findOne({ owner: decodedToken.id });

                if (!todos) {
                    res.send({
                        status: 'Du har ingen todos!'
                    });
                } else {
                    res.send({
                        status: 'Du har todos!',
                        items: todos.items
                    });
                };
            };
        });
    } else {
        // brukeren er ikke logget inn
        res.send({
            status: 'Du er ikke logget inn',
            code: 'ok'
        });
    };
};