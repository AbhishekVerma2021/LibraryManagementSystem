import {
  testingAction,
} from '../../../Redux/action';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  testingAction: () => dispatch(testingAction()),
});