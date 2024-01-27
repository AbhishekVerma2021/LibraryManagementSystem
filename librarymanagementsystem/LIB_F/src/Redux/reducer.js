import {
  TESTING_ACTION_TYPE,
} from './actionTypes';

const initialState = {
  testingState: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TESTING_ACTION_TYPE: {
      return {
        ...state,
      };
    };

    default: return state;
  };
};

export default reducer;