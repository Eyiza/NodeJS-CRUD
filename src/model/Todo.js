const {Schema, model} = require('mongoose');

const todoSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        dueDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const todoModel = model("todos", todoSchema);

module.exports = todoModel;
