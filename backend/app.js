// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const recipeRoutes = require('./routes/api/recipes')

const app = express();
//JSON related issue for UNDEFINED in console.log()
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));

// recipe routes
app.use('/recipe',recipeRoutes) //If we want to add route that is localhost:3000/recipe
//app.use(recipeRoutes)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

