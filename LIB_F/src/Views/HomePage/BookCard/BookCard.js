import React from 'react';
import './BookCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';

const BookCard = (props) => {
  const { book: { image, author, title, category, description } } = props;
  return (<>
    <Card sx={{ maxWidth: '100%', width: '100%', height: '55vh' }}>
      <CardMedia
        sx={{ height: '60%' }}
        image={image}
        title={title}
      />
      <CardContent className='cardContentContainer'>
        <Tooltip title={description}>
          {/* <div className='titleContainer'> */}
          <Typography gutterBottom variant="h5" component="div" >
            {title}
          </Typography>
          {/* </div> */}
          <Typography variant="body2" color="text.primary" className='descriptionContainer'>
            By: {author}
          </Typography>
          <Typography variant="body2" color="text.primary" className='descriptionContainer'>
            Genere: {category}
          </Typography>
          <Typography variant="body2" color="text.secondary" className='descriptionContainer'>
            Description: {description}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  </>)
};

export default BookCard;