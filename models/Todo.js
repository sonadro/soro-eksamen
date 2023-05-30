// packages
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    items: {
        type: Array
    },
    owner: {
        type: String
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;