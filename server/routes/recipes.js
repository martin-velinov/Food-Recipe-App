const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const recipeController = require('../controllers/recipes');
const response = require('../util/responseHandler');
const upload = require('../upload/recipes');

require('dotenv').config();

router.use(
  jwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }).unless({
    path: [
      {
        url: '/api/v1/recipes',
        methods: ['GET'],
      },
      {
        url: /^\/api\/v1\/recipes\/.*/,
        methods: ['GET'],
      },
    ],
  })
);

router.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'UnauthorizedError') {
    response(res, 401, 'Unauthorized access');
  }
});

router
  .get('/', recipeController.getAllRecipes)
  .get('/breakfast', recipeController.getBreakfast)
  .get('/brunch', recipeController.getBrunch)
  .get('/lunch', recipeController.getLunch)
  .get('/dinner', recipeController.getDinner)
  .get('/new', recipeController.newRecipes)
  .get('/popular', recipeController.popularRecipes)
  .patch('/:recipeId', upload.single('recipeImg'), recipeController.editRecipe)
  .get('/:recipeId', recipeController.getOneRecipe)
  .post('/likes', recipeController.likeRecipe)
  .post('/:id', upload.single('recipeImg'), recipeController.createRecipe)
  .delete('/:id', recipeController.deleteRecipe);

module.exports = router;
