import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowRecipeDetails(props) {
    //CONNECTION TO BACKEND
    const connectionPort = process.env.REACT_APP_CONNECTIONPORT;

    const [recipe, setRecipe] = useState({});

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:${connectionPort}/recipe/${id}`)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowRecipeDetails');
                console.log("Error:" + err);
            })
    }, [id]);

    const onDeleteClick = (id) => {
        axios
            .delete(`http://localhost:${connectionPort}/recipe/${id}`)
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                console.log('Error from ShowRecipeDetails_deleteClick');
                console.log("Error:" + err);
            });
    };

    const RecipeItem = (
        <div>
            <table className='table table-hover table-dark'>
                <tbody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Title</td>
                        <td>{recipe.title}</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Author</td>
                        <td>{recipe.Author}</td>
                    </tr>
                    <tr>
                        <th scope='row'>3</th>
                        <td>Ingredients</td>
                        <td>
                            <ul>
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <th scope='row'>3</th>
                        <td>Instructions</td>
                        <td>
                            <ul>
                                {recipe.instructions?.map((instruction, index) => (
                                    <li key={index}>{instruction}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
    return (
        <div className='ShowRecipeDetails'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-10 m-auto'>
                        <br /><br />
                        <Link to='/' className='btn btn-outline-warning float-left'>
                            Show Recipe List
                        </Link>
                    </div>
                    <br />
                    <div className='col-md-8 m-auto'>
                        <h1>Recipe's Records</h1>
                        <p className='lead text-center'>View Recipe's Info</p>
                        <hr /> <br />
                    </div>
                    <div className='col-md-10 m-auto'>{RecipeItem}</div>
                    <div className='col-md-6 m-auto'>
                        <button
                            type='button'
                            className='btn btn-outline-danger btn-lg btn-block'
                            onClick={() => {
                                onDeleteClick(recipe._id);
                            }}
                        >
                            Delete Recipe
                        </button>
                    </div>
                    <div className='col-md-6 m-auto'>
                        <Link
                            to={`/edit-recipe/${recipe._id}`}
                            className='btn btn-outline-ifno btn-lg btn-block'
                        >
                            Edit Recipe
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowRecipeDetails;