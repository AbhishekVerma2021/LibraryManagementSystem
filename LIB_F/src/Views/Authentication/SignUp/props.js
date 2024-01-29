import {
  testingAction,
  handleSignUp,
} from '../../../Redux/action';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  testingAction: () => dispatch(testingAction()),
  handleSignUp: (username, email, password, navigate) => dispatch(handleSignUp(username, email, password, navigate)),
});