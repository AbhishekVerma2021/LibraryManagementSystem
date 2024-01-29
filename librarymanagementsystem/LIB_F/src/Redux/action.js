import {
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
  SUBMIT_USER_FULFILLED,
  SUBMIT_USER_PENDING,
  SUBMIT_USER_REJECTED,
  TESTING_ACTION_TYPE,
  VALIDATE_TOKEN_FULFILLED,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_REJECTED,
  LOGOUT_USER_FULFILLED,
  CREATE_BOOK_PENDING,
  CREATE_BOOK_FULFILLED,
  UPDATE_BOOK_PENDING,
  UPDATE_BOOK_REJECTED,
  UPDATE_BOOK_FULFILLED,
  CREATE_BOOK_REJECTED,
  DELETE_BOOK_FULFILLED,
  DELETE_BOOK_REJECTED,
  DELETE_BOOK_PENDING,
  GET_ALL_BOOKS_PENDING,
  GET_ALL_BOOKS_FULFILLED,
  GET_ALL_BOOKS_REJECTED,
} from './actionTypes';
import Axios from '../Utils/Services';


export const testingAction = () => {
  return (dispatch) => {
    dispatch({ type: TESTING_ACTION_TYPE })
  };
};

export const handleSignIn = (email, password, navigate) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_PENDING });
    Axios.post('/login', {
      email,
      password,
    })
      .then((res) => {
        dispatch({ type: LOGIN_USER_FULFILLED, payload: res.data });
        navigate('/');
      })
      .catch((err) => {
        dispatch({ type: LOGIN_USER_REJECTED, payload: err });
        // navigate('/login');
      });
  };
};

export const handleSignUp = (username, email, password, navigate) => {
  return (dispatch) => {
    dispatch({ type: SUBMIT_USER_PENDING });
    Axios.post('/register', {
      username,
      email,
      password,
    })
      .then((res) => {
        dispatch({ type: SUBMIT_USER_FULFILLED, payload: res.data });
        navigate('/login');
      })
      .catch((err) => {
        dispatch({ type: SUBMIT_USER_REJECTED, payload: err });
      });
  };
};

export const handleLogout = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER_FULFILLED });
  };
};

export const validateToken = (componentPath, navigate) => {
  return (dispatch) => {
    dispatch({ type: VALIDATE_TOKEN_PENDING });
    Axios.get('/validateToken')
      .then((res) => {
        dispatch({ type: VALIDATE_TOKEN_FULFILLED, payload: res.data });
        navigate(componentPath);
      })
      .catch((err) => {
        dispatch({ type: VALIDATE_TOKEN_REJECTED, payload: err });
      });
  };
};

export const getAllBooks = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_BOOKS_PENDING });
    Axios.get('/allBooks')
      .then(res => {
        dispatch({ type: GET_ALL_BOOKS_FULFILLED, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ALL_BOOKS_REJECTED, payload: err });
      });
  };
};

export const createBook = (title, author, category, description, image) => {
  return (dispatch) => {
    dispatch({ type: CREATE_BOOK_PENDING });
    Axios.post('/createBook', { title, author, category, description, image })
      .then(res => {
        dispatch({ type: CREATE_BOOK_FULFILLED, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: CREATE_BOOK_REJECTED, payload: err });
      });
  };
};

export const editBook = (title, author, category, description, base64, _id) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_BOOK_PENDING });
    Axios.post('/updateBook', {
      title,
      author,
      category,
      description,
      image: base64,
      book_id: _id,
    })
      .then((res) => {
        dispatch({ type: UPDATE_BOOK_FULFILLED, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: UPDATE_BOOK_REJECTED, payload: err });
      });
  };
};

export const deleteBook = (_id) => {
  // console.log(_id)
  return (dispatch) => {
    dispatch({ type: DELETE_BOOK_PENDING });
    Axios.post('/deleteBook', {
      book_id: _id,
    })
      .then((res) => {
        dispatch({ type: DELETE_BOOK_FULFILLED, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: DELETE_BOOK_REJECTED, payload: err });
      });
  };
};