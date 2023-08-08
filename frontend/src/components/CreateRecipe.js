import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


function CreateRecipe(props) {
    //PORTCONNECTION TO BACKEND
    const connectionPort = process.env.REACT_APP_CONNECTIONPORT;
    //Define the state with use State hook
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        title: '',
        author: '',
        ingredients:[],
        instructions: [],

        //Implement this portion later
        // image: '',
    })
    const onChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };
    //Ingredients functions
    const addIngredient = () => {
        const newIngredient = {
            name: '',
            quantity: 0,
            unit: '',
        };
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngredient] });
    };

    const updateIngredient = (index, field, value) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][field] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients.splice(index,1);
        setRecipe({...recipe,ingredients:updatedIngredients});
    }
    //Instructions functions
    const addInstruction = () => {
        setRecipe({
            ...recipe,
            instructions: [...recipe.instructions, { text: '' }]
        });
    };

    const updateInstruction = (index, text) => {
        const newInstructions = [...recipe.instructions];
        newInstructions[index] = text;
        setRecipe({ ...recipe, instructions: newInstructions });
    };

    const removeInstruction = (index) => {
        const newInstructions = [...recipe.instructions];
        newInstructions.splice(index, 1);
        setRecipe({ ...recipe, instructions: newInstructions });
    };

    //Recipe to Submit
    const newRecipe = {
        title:recipe.title,
        author:recipe.author,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
    }
    //Button on Submit
    const onSubmit = (e) => {
        e.preventDefault();
        //Formatting to send to DB
        axios
            .post(`http://localhost:${connectionPort}/recipe`, newRecipe)
            .then((res) => {
                setRecipe({
                    title: '',
                    author: '',
                    ingredients: [],
                    instructions: [],
                    //Implement this portion later
                    // image: '',
                });

                //Push to /
                navigate('/');
            })
            .catch((err) => {
                console.log('Error in CreateBook!');
                console.log('Error: ' + err);
            })    
    }
    

    return (
        <div className='CreateRecipe'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show Recipe List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add Recipe</h1>
                        <p className='lead text-center'>Create new Recipe</p>

                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Title of the Recipe'
                                    name='title'
                                    className='form-control'
                                    value={recipe.title}
                                    onChange={onChange}
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <input
                                    type='text'
                                    placeholder='Author'
                                    name='author'
                                    className='form-control'
                                    value={recipe.author}
                                    onChange={onChange}
                                />
                            </div>
                            {/* ====== NEEDS THE REST OF THE SCHEMA ====== */}
                            <div className='form-group'>
                                <button
                                    type='button'
                                    className='btn btn-outline-primary'
                                    onClick={addIngredient}
                                >
                                    Add Ingredient
                                </button>
                                {recipe.ingredients.map((ingredient,index)=> (
                                    <div key={index} className='ingredient-input row'>
                                        <div className='col-md-6'>
                                            <input
                                                type='text'
                                                placeholder='Ingredient Name'
                                                value={ingredient.name}
                                                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                                                className='form-control'
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <input
                                                type='number'
                                                placeholder='Quantity'
                                                value={ingredient.quantity}
                                                onChange={(e) => updateIngredient(index,'quantity', e.target.value)}
                                                className='form-control'
                                                min={0}
                                                max={100}
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <input
                                                type='text'
                                                placeholder='Unit'
                                                value={ingredient.unit}
                                                onChange={(e) => updateIngredient(index,'unit', e.target.value)}
                                                className='form-control'
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <button
                                                type='button'
                                                className='btn btn-outline-danger btn-sm'
                                                onClick={() => removeIngredient(index)}
                                            >
                                                Remove
                                            </button>

                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className='form-group'>
                                <label>Instructions:</label>
                                {recipe.instructions.map((instruction, index) => (
                                    <div key={index} className='input-group mb-2'>
                                        <textarea
                                            className='form-control'
                                            rows='2'
                                            placeholder={`Step ${index + 1}`}
                                            value={instruction}
                                            onChange={(e) =>
                                                updateInstruction(index, e.target.value)
                                            }
                                        />
                                        <div className='input-group-append'>
                                            <button
                                                type='button'
                                                className='btn btn-outline-danger'
                                                onClick={() => removeInstruction(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type='button'
                                    className='btn btn-outline-info'
                                    onClick={addInstruction}
                                >
                                    Add Step
                                </button>
                            </div>
                            <br/>
                            {/* End Submit button */}
                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe;