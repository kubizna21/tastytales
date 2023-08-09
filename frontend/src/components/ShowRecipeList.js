import React, { useState, useEffect } from 'react';
import Styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import axios from 'axios';
import {Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function ShowRecipeList() {
    const connectionPort = process.env.REACT_APP_CONNECTIONPORT;
    const [recipes, setRecipe] = useState ([]);
    useEffect(() => {
        axios
            .get(`http://localhost:${connectionPort}/recipe`)
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
        <Wraped>
            <h3>Saved</h3>
            <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <h2 className='display-4 text-center'></h2>
                </div>

                <div className='col-md-11'>
                    <Link
                        to='/create-recipe'
                        className='btn btn-outline-warning float-right'
                    >
                        + Add New Recipe
                    </Link>
                </div>
            </div>

            <div className='list'>{recipeList}</div>
        </div>
        </Splide>
        </Wraped>
    </div>
        
    );
}

export default ShowRecipeList;

const Wraped = Styled.div`
  margin: 4rem 0rem;
`;
// SHEET IS CARD
const Sheet = Styled.div`
  min-height: 25rem; /* Fixed typo: Changed min-hight to min-height */
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = Styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));



`;
