import {
  TESTING_ACTION_TYPE,
  LOGIN_USER_FULFILLED,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
  SUBMIT_USER_FULFILLED,
  SUBMIT_USER_PENDING,
  SUBMIT_USER_REJECTED,
  VALIDATE_TOKEN_FULFILLED,
  VALIDATE_TOKEN_PENDING,
  VALIDATE_TOKEN_REJECTED,
  LOGOUT_USER_FULFILLED,
  CREATE_BOOK_PENDING,
  CREATE_BOOK_FULFILLED,
  CREATE_BOOK_REJECTED,
  GET_ALL_BOOKS_PENDING,
  GET_ALL_BOOKS_FULFILLED,
  GET_ALL_BOOKS_REJECTED,
  DELETE_BOOK_REJECTED,
  DELETE_BOOK_FULFILLED,
  DELETE_BOOK_PENDING,
  UPDATE_BOOK_FULFILLED,
  UPDATE_BOOK_PENDING,
  UPDATE_BOOK_REJECTED,
} from './actionTypes';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  testingState: '',
  activeUserDetails: {},
  allBooksData: [],
  ussToken: '',
  isUserLoggedIn: false,
  isFullPageLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TESTING_ACTION_TYPE: {
      return {
        ...state,
      };
    };

    case LOGIN_USER_PENDING: {
      return {
        ...state,
        isUserLoggedIn: false,
        isFullPageLoading: true
      }
    };
    case LOGIN_USER_FULFILLED: {
      const { user, token, message } = action.payload;
      if (token) {
        localStorage.setItem("TOKEN", token);
      };
      toast.success(message);
      return {
        ...state,
        ussToken: token,
        activeUserDetails: user,
        isUserLoggedIn: true,
        isFullPageLoading: false,
      };
    };
    case LOGIN_USER_REJECTED: {
      const { message } = action.payload;
      toast.error(message);
      return {
        ...state,
        isUserLoggedIn: false,
        isFullPageLoading: false,
      }
    };

    case LOGOUT_USER_FULFILLED: {
      toast.success('Looged out successfully!')
      localStorage.clear();
      return {
        ...initialState,
      };
    };

    case SUBMIT_USER_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    };
    case SUBMIT_USER_FULFILLED: {
      const { message } = action.payload;
      toast.success(message);
      return {
        ...state,
        isFullPageLoading: false,
      };
    };
    case SUBMIT_USER_REJECTED: {
      const { message } = action.payload;
      console.log(action.payload)
      toast.error(message);
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case VALIDATE_TOKEN_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      }
    };
    case VALIDATE_TOKEN_FULFILLED: {
      const { token, user } = action.payload;
      return {
        ...state,
        ussToken: token,
        activeUserDetails: user,
        isUserLoggedIn: true,
        isFullPageLoading: false,
      }
    };
    case VALIDATE_TOKEN_REJECTED: {
      toast.error('You are not authenticated. Please login!!')
      return {
        ...state,
        isUserLoggedIn: false,
        isFullPageLoading: false,
      }
    };

    case CREATE_BOOK_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case CREATE_BOOK_FULFILLED: {
      const { book, message } = action.payload;
      toast.success(message, {
        position: 'top-right',
      });

      return {
        ...state,
        isFullPageLoading: false,
        allBooksData: [book, ...state.allBooksData],
        activeUserDetails: {
          ...state.activeUserDetails,
          books: [book, ...state.activeUserDetails.books],
        },
      };
    };
    case CREATE_BOOK_REJECTED: {
      const { message } = action.payload;
      toast.error(message);
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case UPDATE_BOOK_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };

    case UPDATE_BOOK_FULFILLED: {
      const { book } = action.payload;
      const updatedUserBooks = state.activeUserDetails.books.map(userBook => userBook._id === book._id ? book : userBook);
      return {
        ...state,
        isFullPageLoading: false,
        activeUserDetails: {
          ...state.activeUserDetails,
          books: updatedUserBooks,
        }
      };
    };

    case UPDATE_BOOK_REJECTED: {
      const { message } = action.payload;
      toast.error(message);
      return {
        ...state,
      }
    }

    case GET_ALL_BOOKS_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case GET_ALL_BOOKS_FULFILLED: {
      const { books } = action.payload;
      return {
        ...state,
        allBooksData: [...books].reverse(),
        isFullPageLoading: false,
      };
    };
    case GET_ALL_BOOKS_REJECTED: {
      return {
        ...state,
        isFullPageLoading: false,
      };
    };

    case DELETE_BOOK_PENDING: {
      return {
        ...state,
        isFullPageLoading: true,
      };
    };
    case DELETE_BOOK_FULFILLED: {
      const { book, message } = action.payload;
      const { _id } = book;
      const updatedAllBooksData = state.allBooksData.filter(itm => itm._id !== _id);
      const updatedUserBooks = state.activeUserDetails.books.filter(itm => itm._id !== _id);
      toast.success(message, {
        position: 'top-right'
      });
      return {
        ...state,
        allBooksData: updatedAllBooksData,
        activeUserDetails: {
          ...state.activeUserDetails,
          books: updatedUserBooks,
        },
        isFullPageLoading: false,
      };
    };
    case DELETE_BOOK_REJECTED: {
      const { message } = action.payload;
      toast.error(message);
      return {
        ...state,
        isFullPageLoading: false,
      };
    };
    default: return state;
  };
};

export default reducer;