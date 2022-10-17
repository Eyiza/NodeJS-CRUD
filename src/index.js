const express = require('express');
const {json} = require('express');
const connect = require('./config/database');
const todoRoutes = require('./router/todoRoutes');
const todoModel = require('./model/Todo');

connect();

const app = express();
app.use(json());
app.use("/todo", todoRoutes);

app.get('/', (req, res) => {
    res.send('MongoDB Atlas Connection Successful');
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  