const router = require("express").Router();
const UsersDb = require("../auth/auth-model");
const bcrypt = require("bcrypt");
const session = require("express-session");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "username or password is missing" });
    }

    const hash = bcrypt.hashSync(password, 14);

    const newUser = {
      username: req.body.username,
      password: hash,
    };

    const addedUser = await UsersDb.create(newUser);
    res.status(201).json(addedUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await UsersDb.findBy({ username: req.body.username });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      req.session.user = user;
      res.json(user);
    }
  } catch (err) {
    // console.log(err.message)
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
