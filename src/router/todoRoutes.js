const router = require('express').Router();
const controller = require('../controller/todoController');


router
    .get('/', controller.getTodos)
    .get('/:id', controller.getTodoById)
    .post('/', controller.createTodo)
    .patch('/:id', controller.updateTodo)
    .delete('/:id', controller.deleteTodo);

module.exports = router;