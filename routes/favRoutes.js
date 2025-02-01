const express = require('express');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../jwt');

const router = express.Router();

// Add a recipe to favorites
router.post('/add/:recipeId', jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.favorites) user.favorites = [];

        if (user.favorites.includes(req.params.recipeId)) {
            return res.status(400).json({ error: 'Recipe already in favorites' });
        }

        user.favorites.push(req.params.recipeId);
        await user.save();

        res.json({ message: 'Recipe added to favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove a recipe from favorites
// router.delete('/remove/:recipeId', jwtAuthMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) return res.status(404).json({ error: 'User not found' });

//         user.favorites = user.favorites.filter(id => id.toString() !== req.params.recipeId);
//         await user.save();

//         res.json({ message: 'Recipe removed from favorites', favorites: user.favorites });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// Get all favorite recipes
router.get('/all', jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
