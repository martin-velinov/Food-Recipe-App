const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const userController = require('../controllers/users');
const response = require('../util/responseHandler');
const upload = require('../upload/users');

require('dotenv').config();

router.use(
  jwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
  }).unless({
    path: [
      {
        url: '/api/v1/users/login',
        methods: ['POST'],
      },
      {
        url: '/api/v1/users/register',
        methods: ['POST'],
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
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getOneUser)
  .post('/login', userController.loginUser)
  .post('/register', userController.registerUser)
  .patch('/:id', upload.single('image'), userController.updateUser)
  .delete('/:id', userController.deleteUser);

module.exports = router;
