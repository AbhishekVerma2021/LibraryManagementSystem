const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Users = require('../')
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send({
      error: "Bad Request",
      message: "Some required fields are missing!!!",
    })
  } else {
    try {
      const alreadyExists = await Users.findOne({ email });
      if (alreadyExists) {
        res.status(409).send({
          error: "User already exists",
          message: `User with ${email} already exists!!!`,
        });
      }
      else {
        const newUser = new Users({
          username,
          email,
        });
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            next(err);
          }
          newUser.set("password", hashedPassword);
          newUser.save().then(() => {
            res.status(201).send({ message: 'Registration successful. Please login!' });
          })
            .catch((er) => {
              res.status(500).send({
                error: "Internal Server Error",
                message: "An unexpected error occurred while processing your request. Please try again later."
              })
            })

        });

      }
    }
    catch (err) {
      console.log(err)
      res.status(500).send({
        error: err,
        message: "Server Error!!!"
      });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({
      error: "Bad Request",
      message: "Some required fields are missing!!!",
    })
  } else {
    try {
      const user = await Users.findOne({ email }).populate({
        path: 'books.book',
        model: 'BOOK',
      });
      if (!user) {
        res.status(404).send({
          error: "User Not Found",
          message: "The requested user does not exist."
        });
      }
      else {
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
          res.status(401).send({
            error: "Unauthorized",
            message: "Incorrect password. Please try again!!"
          });
        }
        else {
          const payload = {
            _id: user._id,
            username: user.username,
          };
          const secretKey = 'MY_SECRET_KEY_ABHISHEK_VERMA';
          jwt.sign(payload, secretKey, { expiresIn: 86400 }, async (err, token) => {
            if (err) {
              res.json({
                message: err,
              });
            }
            else {
              const userWithBooks = await Users.findById(user._id).populate('books');
              const userWithoutPassword = {
                _id: userWithBooks._id,
                books: userWithBooks.books,
                date: userWithBooks.date,
                username: userWithBooks.username,
                email: userWithBooks.email,
              }
              return res.status(200).json({ user: userWithoutPassword, token, message: `Welcome ${userWithBooks.username}` });
            };
          });
        };
      };
    }
    catch (err) {
      res.status(500).send({ error: "Server Error!!!" });
    }
  }
};

const validateToken = async (req, res) => {
  const { user } = req;
  try {
    const userWithBooks = await Users.findById(user._id).populate('books');
    res.status(200).send({
      message: 'Request is authenticated!!',
      user: userWithBooks,
    });
  }
  catch (err) {
    res.status(500).json({
      error: err,
      message: 'Internal Server Error!!',
    })
  }
};

module.exports = {
  registerUser,
  loginUser,
  validateToken,
}