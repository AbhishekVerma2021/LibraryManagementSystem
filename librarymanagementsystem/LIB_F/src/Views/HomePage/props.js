import {
  // fetchProfileIdDetails,
  // setPageHeader,
  getAllBooks,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  // setPageHeader: (headerText) => dispatch(setPageHeader(headerText)),
  // fetchProfileIdDetails: (profileId) => dispatch(fetchProfileIdDetails(profileId)),
  getAllBooks: () => dispatch(getAllBooks()),
});

export const mapStateToProps = (state) => ({
  ussToken: state.ussToken,
  isUserLoggedIn: state.isUserLoggedIn,
  activeUserDetails: state.activeUserDetails,
  allBooksData: state.allBooksData,
  allUsersList: state.allUsersList,
});