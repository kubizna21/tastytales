import React from 'react';
import { Link } from 'react-router-dom';
import'../App.css';

const RecipeCard = (props) => {
    const recipe = props.recipe;

    return (
    <div className='card-container'>
        {/* Needs to be changed */}
        <img
            src='../../public/Adobe_Food.jpeg'
            alt='Ingredients of various fruits and vegitables'
            height={200}
        />
        <div className='desc'>
            <h2>
                <Link to={`/show-recipe/${recipe._id}`}>{recipe.title}</Link>
            </h2>
            <h3>{recipe.author}</h3>
            {/* <p>{recipe.ingredients}</p> */}
            {/* <p>{recipe.instructions}</p> */}
        </div>
    </div>
    );
}

export default RecipeCard;