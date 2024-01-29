import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import './Sidenav.css';
import { red } from '@mui/material/colors';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import notAuthImage from '../../Images/notAuthorizaed.svg';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DashboardIcon from '@mui/icons-material/Dashboard';

const drawerWidth = 240;
const Sidenav = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();
  const {
    children,
    allUsersList,
    handleLogout,
    isUserLoggedIn,
  } = props;

  const {
    activeUserDetails,
  } = props; // states

  const { username, email, _id } = activeUserDetails;

  const {

  } = props; // actions

  const { window } = props;
  // =================================================================================================

  const handleDashboardPage = () => {
    navigate('/')
  };

  const handleLibraryPage = () => {
    navigate('/library');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleCreateBook = () => {
    navigate('/createBook');
  };

  const handleLogoutCLick = () => {
    navigate('/login');
    handleLogout();
  };

  // ======================================MAIN DRAWER===========================================================


  const container = window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <div className={'sideBarContainer'}>
      {<span>
        <div className='avatarConatiner'>
          <Avatar sx={{ bgcolor: red[500], height: "125px", width: "125px" }} aria-label="recipe">
            <span className="avatarForProfile">{username && username.slice(0, 1).toUpperCase()}</span>
          </Avatar>
        </div>
        <div class="usernameContainer">
          {username}
        </div>
        <div class="userEmailContainer">
          {email}
        </div>
        <Divider />
      </span>}
      <List>
        <ListItem key={'Dashboard'} disablePadding={true} onClick={() => handleDashboardPage()}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Dashboard'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Library'} disablePadding={true} onClick={() => handleLibraryPage()}>
          <ListItemButton>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary={'Library'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Profile'} disablePadding={true} onClick={() => handleProfile()}>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={'Profile'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Add new book'} disablePadding={true} onClick={() => handleCreateBook()}>
          <ListItemButton>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary={'Add new book'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Logout'} disablePadding={true} onClick={() => handleLogoutCLick()}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );


  return (<>
    {isUserLoggedIn ? <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          // backgroundColor: 'red',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Library at your finger tips
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            backgroundColor: '#FCEDDA',
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          // className='desktopScreenDrawer'
          sx={{
            // width: "50px !important",
            // backgroundColor: 'red',
            border: '2px solid red',
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        className='boxContainerForFeedSection'
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: "50px" }}
      >
        {children}
      </Box>
    </Box> :
      <div className='notAuthorizedPage'>
        <img src={notAuthImage} alt="" />
        <div>
          You are not authorized to access this page!! <Link style={{ color: '#1976d2' }} to='/login'>Please Login</Link>
        </div>
      </div>}
  </>
  );
}

export default Sidenav;