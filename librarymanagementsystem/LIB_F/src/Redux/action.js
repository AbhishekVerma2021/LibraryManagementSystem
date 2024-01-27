import {
  TESTING_ACTION_TYPE
} from './actionTypes';


export const testingAction = () => {
  return (dispatch) => {
    dispatch({ type: TESTING_ACTION_TYPE })
  };
};