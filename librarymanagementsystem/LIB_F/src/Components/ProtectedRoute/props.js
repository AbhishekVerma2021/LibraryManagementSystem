import {

} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  validateToken: () => dispatch(validateToken()),
});

export const mapStateToProps = (state) => ({
  isUserLoggedIn: state.isUserLoggedIn,
});