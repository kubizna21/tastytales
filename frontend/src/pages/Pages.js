import React from 'react'
import Home from './Home'
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import { Route, Routes } from "react-router-dom";

// backend
import CreateRecipe from '../components/CreateRecipe';
import ShowRecipeDetails from '../components/ShowRecipeDetails';
import ShowRecipeList from '../components/ShowRecipeList';
import UpdateRecipeInfo from '../components/UpdateRecipeInfo';

function Pages() {
    return (

        <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/cuisine/:type' element={<Cuisine />} />
            <Route path='/searched/:search' element={<Searched />} />
            <Route path='/recipe/:name' element={<Recipe />} />

            <Route path='/RecipeList' element={<ShowRecipeList />} />
            <Route path='/create-recipe' element={<CreateRecipe />} />
            <Route path='/edit-recipe/:id' element={<UpdateRecipeInfo />} />
            <Route path='/show-recipe/:id' element={<ShowRecipeDetails />} />

        </Routes>

    )
}
export default Pages