import {
  handleSignIn,
  validateToken,
} from '../../../Redux/action';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  validateToken: (componetPath, navigate) => dispatch(validateToken(componetPath, navigate)),
  handleSignIn: (email, password, navigate) => dispatch(handleSignIn(email, password, navigate)),
});