const jwt = require('jsonwebtoken');
const Recipes = require('../models/recipe');
const Users = require('../models/user');
const response = require('../util/responseHandler');
const { unlink } = require('fs');

require('dotenv').config();

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipes.find();
    response(res, 200, 'All recipes from DB', { allRecipes });
  } catch (err) {
    console.log(err);
  }
};

const getBreakfast = async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: 'breakfast' });

    res.status(200).send({
        message: `Breakfast recipes are here`,
        recipes: recipes
    });
  } catch (error) {
    response(res, 404, 'Not found');
  }
};
const getBrunch = async (req, res) => {
    try {
        const recipes = await Recipes.find({ category: 'brunch' });
    
        res.status(200).send({
            message: `Brunch recipes are here`,
            recipes: recipes
        });
      } catch (error) {
        response(res, 404, 'Not found');
      }
};
const getLunch = async (req, res) => {
    try {
        const recipes = await Recipes.find({ category: 'lunch' });
    
        res.status(200).send({
            message: `Lunch recipes are here`,
            recipes: recipes
        });
      } catch (error) {
        response(res, 404, 'Not found');
      }
};
const getDinner = async (req, res) => {
    try {
        const recipes = await Recipes.find({ category: 'dinner' });
    
        res.status(200).send({
            message: `Dinner recipes are here`,
            recipes: recipes
        });
      } catch (error) {
        response(res, 404, 'Not found');
      }
};

const newRecipes = async (req, res) => {
    try {
        let recipes = await (await Recipes.find().sort({createdAt: -1})).slice(0, 3);
        res.status(200).send({
            message: `Fresh and New recipes are here`,
            recipes
        });
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`); 
    }
};
const popularRecipes = async (req, res) => {
    try {
        let recipes = await (await Recipes.find().sort({likes: -1})).slice(0, 9);
        res.status(200).send({
            message: `Popular recipes are here`,
            recipes
        })
    } catch (error) {
        res.status(500).send(`Internal server error: ${error}`)
    }
};

const getOneRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.recipeId);
    response(res, 200, `Recipe with id ${req.params.recipeId} is fetched`, {
      recipe,
    });
  } catch (err) {
    response(res, 404, `Recipe not found`);
  }
};

const likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.body.recipeId);
    const userId = req.body.userId;
    const recipeId = req.body.recipeId;
    if (recipe.likes.includes(userId)) {
      await Recipes.findByIdAndUpdate(recipeId, {
        $pull: { likes: userId },
      });
      response(res, 200, 'Unliked', { like: false, likeArr: recipe.likes });
    } else {
      await Recipes.findByIdAndUpdate(recipeId, {
        $push: { likes: userId },
      });
      response(res, 200, 'Liked', { like: true, likeArr: recipe.likes });
    }
  } catch (err) {
    response(res, 404, err);
  }
};

const createRecipe = async (req, res) => {
  try {
    req.body.createdBy = req.params.id;
    req.body.recipeImg = `${process.env.REACT_URI}/images/${req.file.filename}`;
    req.body.likes = [];
    const newRecipe = await Recipes.create(req.body);

    await Users.findByIdAndUpdate(req.params.id, {
      $push: { recipes: newRecipe._id },
    });

    response(res, 201, `Created new recipe`, { newRecipe });
  } catch (error) {
    response(res, 400, 'Invalid input');
  }
};

const editRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.recipeId);
    const oldImgFilename = recipe.recipeImg.split('/');
    req.body.likes = recipe.likes;
    req.body.createdBy = recipe.createdBy;
    if (req.file) {
      unlink(`upload/recipes/${oldImgFilename[4]}`, (err) => {
        if (err) throw err;
        console.log('Old image was deleted');
      });
      req.body.recipeImg = `${process.env.REACT_URI}/images/${req.file.filename}`;
    } else {
      req.body.recipeImg = recipe.recipeImg;
    }
    await Recipes.findByIdAndUpdate(req.params.recipeId, req.body);
    response(res, 200, 'Recipe updated');
  } catch (error) {
    response(res, 401, 'Invalid input');
  }
};

const deleteRecipe = async (req, res) => {
  const authToken = await req.headers.authorization;
  const token = authToken.split(' ')[1];
  const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = await tokenData.id;
  
  await Users.findByIdAndUpdate(userId, {
    $pull: { recipes: [req.params.id] },
  });

  const deletedRecipe = await Recipes.findById(req.params.id);
  await Recipes.findByIdAndDelete(req.params.id);
  response(res, 200, 'Recipe deleted', {});
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  getBreakfast,
  getBrunch,
  getDinner,
  getLunch,
  newRecipes,
  popularRecipes,
  deleteRecipe,
  likeRecipe,
  editRecipe,
};