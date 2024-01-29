import {
  // fetchProfileIdDetails,
  // setPageHeader,
  editBook,
} from '../../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  // setPageHeader: (headerText) => dispatch(setPageHeader(headerText)),
  // fetchProfileIdDetails: (profileId) => dispatch(fetchProfileIdDetails(profileId)),
  editBook: (title, author, category, description, base64, _id) => dispatch(editBook(title, author, category, description, base64, _id)),
});

export const mapStateToProps = (state) => ({
  // ussToken: state.ussToken,
  // isUserLoggedIn: state.isUserLoggedIn,
  activeUserDetails: state.activeUserDetails,
  // pageHeaderText: state.pageHeaderText,
  // allUsersList: state.allUsersList,
});