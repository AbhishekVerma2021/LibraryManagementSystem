import React, { useState } from 'react';
import './EditBookDialog.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import ConfirmationDialog from '../../../Components/ConfirmationDialog';

const EditBookDialog = (props) => {
  const {
    open,
    setOpenEditBookDialog,
    book: {
      author,
      title,
      description,
      _id,
      category,
    },
    editBook,
  } = props;
  // console.log(openEditBookDialog)
  const [formData, setFormData] = useState({
    editedTitle: title,
    editedAuthor: author,
    editedCategory: category,
    editedDescription: description,
  });

  const [image, setImage] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

  const handleSubmit = async () => {
    // e.preventDefault();
    const { editedTitle, editedAuthor, editedCategory, editedDescription } = formData;
    if (!error) {
      try {
        const base64 = await convertImageToBase64(image);
        await editBook(editedTitle, editedAuthor, editedCategory, editedDescription, base64, _id);
      }
      catch (err) {
        alert('Something went wrong!!!')
      }
    }
  };
  const { editedTitle, editedAuthor, editedCategory, editedDescription } = formData;

  const error = !editedTitle || !editedDescription || !editedCategory || !image || !editedAuthor || image.name.length === 0 || editedAuthor.length === 0 || editedDescription.length === 0 || editedTitle.length === 0 || editedCategory.length === 0;

  return (<>
    <Dialog
      open={open}
      onClose={() => setOpenEditBookDialog(false)}
      // sx={{ height: '90vh' }}
      PaperProps={{
        style: {
          height: '90vh',
          width: '50vw',
        }
      }}
    >
      <DialogTitle>
        Edit Your Book Details!!
      </DialogTitle>
      <DialogContent>
        <Box
          className='editBookFormMasterContainer'
          // component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            '@media (max-width: 400px)': {
              '& .MuiTextField-root': { width: '100%' }
            }
          }}
          noValidate
          autoComplete="off"
          // onSubmit={handleSubmit}
        >
          <TextField
            name="editedTitle"
            // sx={{ width: '100%' }}
            label="Book Title"
            value={formData.editedTitle}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            name="editedAuthor"
            label="Author Name"
            value={formData.editedAuthor}
            onChange={handleChange}
            variant="outlined"
            required
          />
          <TextField
            name="editedCategory"
            select
            label="Category"
            value={formData.editedCategory}
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
            name="editedDescription"
            label="Description"
            value={formData.editedDescription}
            onChange={handleChange}
            multiline
            rows={4}
            variant="outlined"
            required
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginLeft: '7px' }}
          >
            {image.length <= 0 ? 'Upload Book Cover' : image?.name}
            <input
              type="file"
              name="coverImage"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <Button sx={{ marginLeft: '7px' }} onClick={() => setOpenConfirmation(true)} disabled={error} type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenEditBookDialog(false)}>
          Close
        </Button>
      </DialogActions>
      <ConfirmationDialog open={openConfirmation} setOpen={setOpenConfirmation} onConfirm={handleSubmit} title={'Edit this post?'} />
    </Dialog>
  </>);
};

export default EditBookDialog;