import { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
// import { getToken } from '@/utils/auth';
// import { _Actions } from '@/store/actions/index';
import Login from '@pages/login/index';
import PrivateRoute from '@/configs/router.config';
import BaseApp from './base_app';
import Notfound from '../404';
import NoPermission from '../no_permission';

// import { connect } from 'react-redux';

// <RoutesComponents />
class IndexRoutesPage extends PureComponent {
  // componentDidMount(){
  //   const { refreshToken } = this.props;
  //   refreshToken();
  // }
  render() {
    return (
      <Switch>
        <PrivateRoute path='/login' exact LocalComponent={ Login } />
        <Route path='/404' component={ Notfound } />
        <Route path='/nopermission' component={ NoPermission } />
        <PrivateRoute path='/' LocalComponent={ BaseApp } />
      </Switch>
    );
  }
}
// function mapStateToProps(state) {
//   return {
//     token: state.token || getToken() || ''
//   };
// }
// function mapDispatchToProps(dispatch, ownProps) {
//   return {
//     refreshToken: ()=> {
//       const token = getToken() || '';
//       dispatch(_Actions.token(token));
//       return token;
//     }
//   };
// }
export default IndexRoutesPage;