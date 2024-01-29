import React from 'react';
import './Profile.css';
import ProfileBookCard from './ProfileBookCard';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';
import addImage from '../../Images/addBook.svg';

const Profile = (props) => {
  const { activeUserDetails: { books, username, email } } = props;
  console.log(books)
  return (<>
    <div className="masterProfileBooksContainer">
      <div className="masterProfileUserDetails">
        <div className="userAvatarContainer">
          <Avatar sx={{ bgcolor: red[500], height: "125px", width: "125px" }} aria-label="recipe">
            <span className="avatarForProfile">{username && username.slice(0, 1).toUpperCase()}</span>
          </Avatar>
        </div>
        <div className="userFurtherDetailsContainer">
          <div className="usernameContaner">Name: {username}</div>
          <div className='emailContainer'>Email: {email}</div>
          <div className="numberOfPostVontainer">Books Added: {books && books.length}</div>
        </div>
      </div>
      <div className="horizontalDividerContainer">
        <hr />
      </div>
      {books && books.length > 0 ? <div className="masterProfileBooksCardContainer">
        {[...books].reverse().map((book) => {
          return <ProfileBookCard book={book} />
        })}
      </div> :
        <div className='masterNoBooksOnProfileContainer'>
          <img src={addImage} alt="No Image Found" />
          <div>
            You have added no books yet!! <Link to='/createBook' style={{ cursor: 'pointer', color: '#1976d2' }}>Add One</Link>
          </div>
        </div>}
    </div>
  </>);
}

export default Profile;