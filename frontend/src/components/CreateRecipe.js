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
        //Implement this portion later
        // ingredients: '',
        // instructions: '',
        // image: '',
    })
    const onChange = (e) => {
        setRecipe({...recipe,[e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    axios
        .post(`http://localhost:${connectionPort}/recipe`,recipe)
        .then((res) => {
            setRecipe({
                title: '',
                author: '',
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
        })

    return (
    <div className='CreateRecipe'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <br/>
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
                        <br/>
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