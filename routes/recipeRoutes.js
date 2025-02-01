const express = require('express');
const Recipe = require('../models/recipe');
const { jwtAuthMiddleware } = require('../jwt');

const router = express.Router();

// Create a Recipe (Protected)
router.post('/add', jwtAuthMiddleware, async (req, res) => {
    try {
        const { title, description, ingredients, steps, image } = req.body;

        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            image,
            user: req.user.id
        });

        await newRecipe.save();
        res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Error creating recipe:', error); 
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all recipes
// router.get('/all', async (req, res) => {
//     try {
//         const recipes = await Recipe.find().populate('user', 'name email');
//         res.json(recipes);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// Get all recipes with pagination
router.get('/all', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
        const recipes = await Recipe.find()
            .populate('user', 'name email')
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalRecipes = await Recipe.countDocuments();
        const totalPages = Math.ceil(totalRecipes / limit);

        res.json({ recipes, totalRecipes, totalPages, currentPage: page });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get a single recipe by ID
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'name email');
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a recipe (Protected)
router.put('/update/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        if (recipe.user.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

        const { title, description, ingredients, steps, image } = req.body;
        recipe.title = title || recipe.title;
        recipe.description = description || recipe.description;
        recipe.ingredients = ingredients || recipe.ingredients;
        recipe.steps = steps || recipe.steps;
        recipe.image = image || recipe.image;

        await recipe.save();
        res.json({ message: 'Recipe updated successfully', recipe });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a recipe (Protected)
router.delete('/delete/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        if (recipe.user.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

        await recipe.remove();
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
