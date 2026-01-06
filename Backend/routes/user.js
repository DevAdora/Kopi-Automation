const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/database');
const User = require('../models/user');

router.post('/authenticate', async (req, res, next) => {
  const { username, password } = req.body;
      const user = await User.findByUsername(username);
  try {
      if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({data:user}, config.secret, {
          expiresIn: 604800
      });
      if(token) {
          res.json({
              success: true + ' Login successful',
              token: 'JWT ' + token,
              user: {
                  username: user.username,
                  password: user.password,
              }
          });
      }
      } else {
          res.status(401).send('Invalid credentials');
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Error during login');
  }
});


module.exports = router;