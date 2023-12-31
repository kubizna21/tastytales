const express = require('express');
const router = express.Router();

//Load Recipe model 
//=== Must update===
const Recipe = require('../../models/Recipe');

// @route GET api/recipe/test
// @description tests recipe route
// @access Public

router.get('/test',(req,res) => res.send('recipe route testing!'));

// @route GET api/recipe/:id
// @description Get single recipe by id
// @access Public
router.get('/',(req,res)=> {
    Recipe.find()
    .then(recipe =>res.json(recipe))
    .catch(err => {
        res.status(404).json({noRecipeFound: 'No Recipes Found'
    })});
});

// @route GET api/recipe
// @description add/save recipe
// @access Public
router.get('/:id', (req,res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(404).json({noRecipeFound: 'No Recipe Found'}));
});

// @route POST api/recipe
// @description add/save recipe
// @access Public
router.post('/',(req,res) => {
    Recipe.create(req.body)
    .then(recipe => res.json({msg:'Recipe added successfully'}))
    .catch(err => res.status(400).json({error: err}));

});

// @route PUT api/recipe/:id
// @description Update recipe
// @access Public
router.put('/:id', (req,res) => {
    Recipe.findByIdAndUpdate(req.params.id,req.body)
        .then(recipe => res.json({msg: 'Updated successfully'}))
        .catch(err => 
            res.status(400).json({error:'Unable to update the Database'})    
        );
});

// @route GET api/recipe/:id
// @description Delete recipe by id
// @access Public
router.delete('/:id', (req,res) => {
    Recipe.findByIdAndRemove(req.params.id, req.body)
    .then(recipe => res.json({msg: 'Recipe entry deleted successfully' }))
    .catch(err => res.status(404).json({error: 'Recipe does not exist'}));
})

module.exports = router;