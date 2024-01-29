import React, { useState } from 'react';
import './CreateBook.css';
import { TextField, MenuItem, Button, Box } from '@mui/material';
const CreateBook = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
  });
  const [image, setImage] = useState('');



  const {
    createBook
  } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const { author, description, title, category } = formData;
  const error = !author || !description || !category || !title || !image || image.name.length === 0 || author.length === 0 || description.length === 0 || title.length === 0 || category.length === 0;
  
  const convertImageToBase64 = (file) => {
    const maxSizeMB = 37.5; // Approximate size considering Base64 inflation, adjust as needed
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
  
    if (file.size > maxSizeBytes) {
      alert(`File size is too large. Please choose a file smaller than ${maxSizeMB} MB.`);
      return Promise.reject(`File size is too large.`);
    }
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { author, description, title, category } = formData;
    if(!error) {
      try {
        const base64 = await convertImageToBase64(image);
        console.log(base64.length);
        await createBook(title, author, category, description, base64);
      }
      catch (err) {
        alert('Something went wrong!!!')
      }
    }
  };
  return (
    <Box
      className='createBookFormMasterContainer'
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        '@media (max-width: 400px)': {
          '& .MuiTextField-root': { width: '100%' }
        }
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        name="title"
        label="Book Title"
        value={formData.title}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        name="author"
        label="Author Name"
        value={formData.author}
        onChange={handleChange}
        variant="outlined"
        required
      />
      <TextField
        name="category"
        select
        label="Category"
        value={formData.category}
        onChange={handleChange}
        helperText="Please select the book category"
        variant="outlined"
        required
      >
        {['Comic', 'Fiction', 'Novel', 'Mystery', 'Narrative', 'SciFi'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        variant="outlined"
        required
      />
      <Button
        variant="contained"
        component="label"
      >
        {image.length <= 0 ? 'Upload Book Cover' : image?.name}
        <input
          type="file"
          name="coverImage"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button>
      <Button disabled={error} type="submit" variant="contained" color="primary"> 
        Submit
      </Button>
    </Box>
  );
}

export default CreateBook;