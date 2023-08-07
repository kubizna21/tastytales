import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import {Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function ShowRecipeList() {
    const [recipes, setRecipe] = useState ([]);
    useEffect(() => {
        axios
            .get(`http://localhost:${process.env.PORT}/recipe`)
            .then((res) => {
                setRecipe(res.data);
            })
            .catch((err) => {
                console.log('Error from ShowRecipeList');
                console.log("Error: " + err);
            });
    },[]);

    const recipeList = 
        recipes.length === 0
            ? 'There is no recipe record!'
            : recipes.map((recipe, k) => <RecipeCard recipe={recipe} key = {k} />)
    return (
    <div className='ShowRecipeList'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <br/>
                    <h2 className='display-4 text-center'>Recipe List</h2>
                </div>

                <div className='col-md-11'>
                    <Link
                        to='/create-recipe'
                        className='btn btn-outline-warning float-right'
                    >
                        + Add New Recipe
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                    <hr/>
                </div>
            </div>

            <div className='list'>{recipeList}</div>
        </div>
    </div>
        
    );
}

export default ShowRecipeList;