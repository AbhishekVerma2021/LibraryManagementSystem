import {
  // fetchProfileIdDetails,
  // setPageHeader,
  createBook,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  // setPageHeader: (headerText) => dispatch(setPageHeader(headerText)),
  // fetchProfileIdDetails: (profileId) => dispatch(fetchProfileIdDetails(profileId)),
  createBook: (title, author, category, description, image) => dispatch(createBook(title, author, category, description, image)),
});

export const mapStateToProps = (state) => ({
  // ussToken: state.ussToken,
  // isUserLoggedIn: state.isUserLoggedIn,
  // activeUserDetails: state.activeUserDetails,
  // pageHeaderText: state.pageHeaderText,
  // allUsersList: state.allUsersList,
});