import FullPageLoader from "./FullPageLoader";
import { connect } from "react-redux";
import {
  mapStateToProps,
  // mapDispatchToProps,
} from './props';
export default connect(mapStateToProps, null)(FullPageLoader);