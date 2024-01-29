import {
  // fetchProfileIdDetails,
  // setPageHeader,
  handleLogout,
} from '../../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  // setPageHeader: (headerText) => dispatch(setPageHeader(headerText)),
  // fetchProfileIdDetails: (profileId) => dispatch(fetchProfileIdDetails(profileId)),
  handleLogout: () => dispatch(handleLogout()),
});

export const mapStateToProps = (state) => ({
  // ussToken: state.ussToken,
  isUserLoggedIn: state.isUserLoggedIn,
  activeUserDetails: state.activeUserDetails,
  // pageHeaderText: state.pageHeaderText,
  // allUsersList: state.allUsersList,
});