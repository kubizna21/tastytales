
import React, { useState, useEffect} from 'react';
import {Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


function UpdateRecipeInfo(props) {
    //CONNECTION TO BACKEND
    const connectionPort = process.env.REACT_APP_CONNECTIONPORT;
    const [recipe, setRecipe] = useState({
        title:'',
        author:'',
        // ingredients:'',
         instructions:[],
        // image:'',
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:${connectionPort}/recipe/${id}`)
            .then((res) => {
                setRecipe({
                    title: res.data.title,
                    author: res.data.author,
                    instructions: res.data.instructions,
                    // Needs Ingredients, instructions, image
                });
            })
            .catch((err) => {
                console.log('Error from UpdateRecipeInfo');
                console.log("Error:" + err);
            })
    }, [id]);

    const onChange = (e) => {
        if (e.target.name === 'instructions') {
            // Split the textarea content into an array of instructions
            const instructionsArray = e.target.value.split('\n');
            setRecipe({ ...recipe, instructions: instructionsArray });
        } else {
            setRecipe({ ...recipe, [e.target.name]: e.target.value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            title: recipe.title,
            author: recipe.author,
            // ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            // image: recipe.image,
        }
    

        axios
            .put(`http://localhost:${connectionPort}/recipe/${id}`, data)
            .then((res) => {
                navigate(`/show-recipe/${id}`);
            })
            .catch((err) => {
                console.log('Error from UpdateRecipeInfo!');
                console.log("Error: " + err);
            });
    };
    return (
        <div className='UpdateRecipeInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show Recipe List
                        </Link>
                    </div>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Edit Recipe</h1>
                        <p className='lead text-center'>Update Recipe's Info</p>
                    </div>
                </div>
                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
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
                        <div>
                            <label htmlFor='author'>Author</label>
                            <input
                                type='text'
                                placeholder='Author'
                                name='author'
                                className='form-control'
                                value={recipe.author}
                                onChange={onChange}
                            />
                        </div>
                        <br/>
                        {/* Ingredients Is missing*/}
                        <div>
                            <label htmlFor='instructions'>Instructions</label>
                            <textarea
                                rows='5'
                                placeholder='Enter recipe instructions'
                                name='instructions'
                                className='form-control'
                                value={recipe.instructions.join('\n')} // Join instructions array with line breaks
                                onChange={onChange}
                            />
                        </div>
                        <br />
                        {/* Keep at the end */}
                        <button
                            type='submit'
                            className='btn btn-outline-info btn-lg btn-block'
                        >
                            Update Recipe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateRecipeInfo;