import { Route, Redirect } from 'react-router';
import { getToken } from '@/utils/auth';
import { _Actions } from '@/store/actions/index';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';
// here token from connect => store state token

function PrivateRoute({ 
  LocalComponent, path, ...args 
}) {
  const { location, token } = args;
  return (<Route {...args} render={(args) => {
    
    if ( !token && path !== '/login') return (<Redirect to={{ pathname: '/login', state: location.state || {} }} />);
    if (path === '/login' && token) {
      return (<Redirect to={{ pathname: '/', state: location.state || {} } } />);
    }
    return (<LocalComponent { ...args} />);
    // console.log(component);
  }}/>);
  // if (component) {
  //   return (<Route {...args} component={({ location, ...ags })=>{
  //     const type = 1;
  //     const Component = component;
  //     return renderComponent({ 
  //       location, path, Component, token, type 
  //     },{ location, ...ags });
  //   }}/>);
  // }
  // return (<Route 
  //   {...args}
  //   render={({ location, ...ags }) => {
  //     const type = 2;
  //     return renderComponent({ 
  //       path, children, token, type 
  //     },{ location, ...ags });
  //   }}

  // />);
}

// function renderComponent(args,props){
//   const {  
//     path, 
//     token,
//     type,

//   } = args;
//   if ( !token && path !== '/login') return (<Redirect to="/login" />);
//   if (path === '/login' && token) {
//     return (<Redirect to="/" />);
//   }
//   if (type === 2) {
//     const { children } = args;
//     return (children);
//   }
//   const { Component } = args;
//   return <Component {...props}/>;
// }

function mapStateToProps(state) {
  let { token } = state;
  return {
    token: token || ''
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    refreshToken: ()=> {
      const token = getToken() || '';
      dispatch(_Actions.token(token));
      return token;
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
// export default PrivateRoute;