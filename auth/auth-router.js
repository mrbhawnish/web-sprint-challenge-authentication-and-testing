const router = require('express').Router();
const UsersDb = require('../auth/auth-model');
const bcrypt = require("bcrypt");

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password) {
    res.status(400).json({message: "username or password is missing"})
  }

  const hash = bcrypt.hashSync(password, 14)
  const newUser = {
    username: req.body.username,
    password: hash
  }
  const addedUser = await UsersDb.create(newUser)
  res.status(201).json(addedUser)
  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
