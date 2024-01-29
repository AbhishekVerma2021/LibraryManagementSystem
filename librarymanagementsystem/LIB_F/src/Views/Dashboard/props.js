import {
  getAllBooks,
} from '../../Redux/action';


export const mapStateToProps = (state) => ({
  allBooksData: state.allBooksData,
});

export const mapDispatchToProps = (dispatch) => ({
  getAllBooks: () => dispatch(getAllBooks()),
});