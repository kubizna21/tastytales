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
        instructions: [],

        //Implement this portion later
        // ingredients: '',
        // image: '',
    })
    const onChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

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
        instructions: recipe.instructions
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
                    instructions: [],
                    //Implement this portion later
                    // ingredients: '',
                    // instructions: '',
                    // image: '',
                });

                //Push to /
                navigate('/');
            })
            .catch((err) => {
                console.log(connectionPort);
                console.log('Error in CreateBook!');
                console.log('Error: ' + err);
                console.log('instructions:'+ newRecipe.instructions[0])
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