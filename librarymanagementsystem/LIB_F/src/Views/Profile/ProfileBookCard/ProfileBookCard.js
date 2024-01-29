import React, { useState } from 'react';
import './ProfileBookCard.css';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditBookDialog from '../EditBookDialog';
import ConfirmationDialog from '../../../Components/ConfirmationDialog';

const ProfileBookCard = (props) => {
  const { book, activeUserDetails: { username, email }, deleteBook } = props;
  const { author, description, image, title, category, date, _id } = book;

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openEditBookDialog, setOpenEditBookDialog] = useState(false);
  const [openDeleteBookDialog, setOpenDeleteBookDialog] = useState(false);

  // Open menu
  const handleMoreIconClick = (event) => {
    setOpenDropdown(event.currentTarget);
  };

  // Close menu
  const handleClose = () => {
    setOpenDropdown(null);
  };

  const handleDeleteBook = async () => {
    try {
      if (_id) {
        await deleteBook(_id);
      }
    }
    catch (err) {
      alert('Something went wrong!!!')
    };
  };


  const inputDate = new Date(date);


  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Use 12-hour clock
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);

  return (<>
    <Card sx={{ width: '100%', height: '60vh', }}>
      <Menu
        id="menu-appbar"
        anchorEl={openDropdown}
        anchorOrigin={{
          vertical: 'bottom',  // Aligns the bottom of the menu with the top of the anchor
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className='menuForBookAction'
        sx={{ backgroundColor: 'transparent !important' }}
        open={Boolean(openDropdown)}
        onClose={handleClose}
      >
        {/* Menu items can be added here */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Tooltip placement="right-end" title='Edit Book Details'>
            <IconButton className='actionIcons' onClick={() => { setOpenEditBookDialog(true); handleClose(); }}><EditIcon /></IconButton>
          </Tooltip>
          <Tooltip placement="right-end" title='Delete Book!!'>
            <IconButton className='actionIcons' onClick={() => { setOpenDeleteBookDialog(true); handleClose(); }}><DeleteIcon /></IconButton>
          </Tooltip>
        </div>
      </Menu>
      <CardHeader
        // onClick={() => handleProfileViewClick()}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMoreIconClick}>
            <MoreVertIcon />
          </IconButton>
        }
        className='postHeader'
        sx={{ fontWeight: "700", cursor: "pointer", padding: '5px' }}
        title={username}
        subheader={
          <Tooltip title={formattedDate}>
            <span className='dateStampContainer'>
              {formattedDate}
            </span>
          </Tooltip>
        }
      />
      <CardMedia
        sx={{ height: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        image={image}
        title={title}
      />
      <CardContent className='cardContentContainer'>
        {/* <div className='titleContainer'> */}
        <Tooltip title={title}>
          <Typography gutterBottom variant="h5" component="div" >
            {title}
          </Typography>
        </Tooltip>
        {/* </div> */}
        <Tooltip title={description}>
          <Typography variant="body2" color="text.secondary" className='descriptionContainer'>
            {description}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions>
        <Button size="small">{category}</Button>
        <Button size="small">{author}</Button>
      </CardActions>
      <EditBookDialog open={openEditBookDialog} book={book} setOpenEditBookDialog={setOpenEditBookDialog} />
      <ConfirmationDialog open={openDeleteBookDialog} onConfirm={handleDeleteBook} setOpen={setOpenDeleteBookDialog} title={'Are you sure to delete this book?'} warning={true} />
    </Card>
  </>);
};

export default ProfileBookCard;