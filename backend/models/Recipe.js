const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    ingredients:{
        type: [
            {
                name: String, //Ingredient name
                quantity: Number, //Quantity of the ingredient
                unit: String, // Unit of measurement (e.g., cups,tbsp,tsp,oz, etc...)  
            },  
        ],
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    instructions: {
        type: [String], //Array of strings to store multiple steops in the sinstructions
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
})

module.export = Recipe = mongoose.model('recipe', RecipeSchema)