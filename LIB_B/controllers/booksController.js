const Books = require('../models/bookModel');
const Users = require('../models/userModel');
const uploadImageService = require('../Services/uploadImage');
const { uploadImageToCloudinary } = uploadImageService;


const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(200).send({ books })
  }
  catch (err) {
    res.status(500).json({
      error: err,
      message: 'Internal Server Error!!'
    })
  }
};

const createBook = async (req, res) => {
  const { image, author, title, description, category } = req.body;
  const { user } = req;
  // console.log(!image , !author , !title , !catagory , !description)
  if (!image || !author || !title || !category || !description) {
    res.status(400).send({
      error: "Bad Request",
      message: "Some required fields are missing!!!",
    });
  }
  else {
    try {

      const url = await uploadImageToCloudinary(image);
      let newBook = new Books({
        author,
        title,
        image,
        category,
        description,
        image: url,
        user,
      });
      let savedBook = await newBook.save();
      await Users.findByIdAndUpdate({ _id: user._id }, {
        $push: { books: savedBook._id }
      }, { new: true });
      savedBook = await savedBook.populate('user');
      res.status(201).json({ book: savedBook, message: 'Book add to Library!!' });
    }
    catch (err) {
      res.status(500).json({ error: err, message: "Internal Server Error!1!!" });
    }
  }
};

const updateBook = async (req, res) => {
  const { image, author, title, description, category, book_id } = req.body;
  if (!image && !author && !title && !category && !description && !book_id) {
    res.status(400).send({
      error: "Bad Request",
      message: "Some required fields are missing!!!",
    });
  }
  else {
    try {
      // console.log(image, book_id)
      const url = await uploadImageToCloudinary(image);
      // console.log(url)
      const updatedBook = await Books.findByIdAndUpdate({ _id: book_id }, {
        image: url,
        author,
        title,
        description,
        category,
      },
        { new: true });
      if (!updatedBook) {
        res.status(404).send({
          error: "Book Not Found",
          message: `No book found with the ID ${book_id}.`,
        });
      };
      res.status(200).send({ book: updatedBook, message: 'Successfully updated books details!' });
    }
    catch (err) {
      res.status(500).json({ error: err, message: "Internal Server Error!!!" });
    };
  };
};

const deleteBook = async (req, res) => {
  const { book_id } = req.body;
  if (!book_id) {
    res.status(400).send({
      error: "Bad Request",
      message: "Some required fields are missing!!!",
    });
  }
  else {
    try {
      const deletedBook = await Books.findByIdAndDelete({ _id: book_id });
      if (!deletedBook) {
        return res.status(404).send({
          error: "Not Found",
          message: `No book found with the ID ${book_id}.`,
        });
      };

      res.status(200).send({
        message: 'Book deleted successfully',
        book: deletedBook
      });
    }
    catch (err) {
      res.status(500).json({ error: err, message: "Internal Server Error!!!" });
    }
  }
};

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
};