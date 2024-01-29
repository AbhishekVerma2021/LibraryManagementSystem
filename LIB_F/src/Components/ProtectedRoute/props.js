import {
  validateToken,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  validateToken: (componentPath,navigate) => dispatch(validateToken(componentPath, navigate)),
});

export const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});