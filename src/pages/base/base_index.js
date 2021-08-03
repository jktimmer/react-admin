import { connect } from 'react-redux';
import { Redirect } from 'react-router';
function RedirectToFirstPage(props) {
  const { userInfo, location } = props;

  const { pathname } = location;
  return (<div>
    { userInfo ? ( pathname === '/' ? <Redirect to='/userCenter'/> : <Redirect to={pathname}/>) : '' }
  </div>);
}

function mapStateProps(state) {
  return {
    userInfo: state.userInfo
  };
}
export default connect(mapStateProps)(RedirectToFirstPage);