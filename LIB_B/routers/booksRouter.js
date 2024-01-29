const express = require('express');
const router = express.Router();
const BooksController = require('../controllers/booksController');
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = BooksController;
const authenticate = require('../middleware/authenticate');

router.post('/createBook',authenticate, createBook);
router.get('/allBooks', authenticate, getAllBooks);
router.post('/updateBook', authenticate, updateBook);
router.post('/deleteBook', authenticate, deleteBook);

module.exports = router;