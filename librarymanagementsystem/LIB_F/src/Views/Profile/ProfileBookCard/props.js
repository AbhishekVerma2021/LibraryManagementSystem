import {
  deleteBook,
} from '../../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  // setPageHeader: (headerText) => dispatch(setPageHeader(headerText)),
  // fetchProfileIdDetails: (profileId) => dispatch(fetchProfileIdDetails(profileId)),
  deleteBook: (_id) => dispatch(deleteBook(_id)),
});

export const mapStateToProps = (state) => ({
  // ussToken: state.ussToken,
  // isUserLoggedIn: state.isUserLoggedIn,
  activeUserDetails: state.activeUserDetails,
  // pageHeaderText: state.pageHeaderText,
  // allUsersList: state.allUsersList,
});