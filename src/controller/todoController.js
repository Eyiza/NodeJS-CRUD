const Todo = require("../model/Todo")

// Get all todos with Pagination
exports.getTodos = async(req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        // execute query with page and limit values
        const todos = await Todo.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        // get total documents in the Todos collection 
        const count = await Todo.countDocuments();
        let ratio = count/limit;

        if(count === 0){
            return res.status(404).json({
                success: false,
                message: "No todos found"
            });
        }

        if(page >= (ratio + 1)){
            return res.status(404).json({
                success: false,
                message: "Page does not exist"
            });
        }        

        res.status(200).json(
            {
                success: true,
                message: "Todos found",
                todos,
                totalPages: Math.ceil(ratio),
                currentPage: page
            }
        );
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}

// Get a single todo
exports.getTodoById = async(req, res) => {
    try {
        let id = { _id: req.params.id }; 
        let todo = await Todo.findOne({_id: id});
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        res.status(200).json(
            {
                success: true,
                message: "Todo found",
                todo
            }
        );
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}

// Create a todo
exports.createTodo = async(req, res) => {
    try {
        let todo = await req.body;
        let created = await Todo.create(todo)
        if(!created){
            return res.status(400).json({
                success: false,
                message: "Todo creation failed"
            });
        }
        return res.status(201).json(
            {
                success: true,
                message: "Todo created",
                todo
            }
        );
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}

// Update todos
exports.updateTodo = async(req, res) => {
    try {
        let id = { _id: req.params.id };
        let todo = await req.body;
        let update = await Todo.findOneAndUpdate(id, todo, {new:true});
        if(!update){
            return res.status(400).json({
                success: false,
                message: "Todo update failed"
            });
        }
        return res.status(200).json(
            {
                success: true,
                message: "Todo updated successfully",
                todo: update
            }
        );
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}

// Delete todos

exports.deleteTodo = async(req, res) => {
    try {
        let id = { _id: req.params.id };
        let todo = await Todo.findOneAndRemove(id);
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        return res.status(200).json(
            {
                success: true,
                message: `Todo deleted successfully`,
                todo
            }
        );
    } catch (err) {
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}
