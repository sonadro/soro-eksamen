// imports
const { Router } = require('express');
const todoController = require('../controllers/todoController');

const router = Router();

// routes
router.post('/todo-update', todoController.todo_update);
router.get('/todo-getusertodos', todoController.todo_getUserTodos);

// export router
module.exports = router;