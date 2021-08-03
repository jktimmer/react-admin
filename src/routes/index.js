import { Route } from 'react-router-dom';
import RouterInfoJson from './route.json';
import { lazy } from 'react';
import LoadingHelper from '@components/LoadingHelper/index';
// <LoadingHelper Component=/>
//import(`@pages/${path}`)
const pkg = (path) => lazy(() => import(`@pages/${path}`));
// const cp = () => {
//   return deepLoopRouter(RouterInfoJson, '/');
//   // return <Suspense fallback={<div>loading...</div>}>
//   //   <Switch>
//   //     {
//   //       deepLoopRouter(RouterInfoJson, '/')
//   //     }
//   //     <Route path='*'>
//   //       <Notfound />
//   //     </Route>
//   //   </Switch>
//   // </Suspense>;
// };
const NoPermissionRouteList = [];
function deepLoopRouter(list, cpath) {
  if (!list || list.length === 0) return null;
  return list.map((item, idx) => {
    const { 
      path, exact, componentPath,
      children, perm 
    } = item;
    if (!path) return null;
    if (path && path.indexOf(`${cpath}/`) < 0) return null;
    if (perm === false) {
      NoPermissionRouteList.push(path);
    }
    if (componentPath && !children) {
      return <Route key={idx} path={path} exact={exact} component={(args) => {
        return <LoadingHelper key={idx + path } {...args} Component={pkg(componentPath)}/>;
      }} />;
    }
    if (componentPath && children) {
      const parent = <Route key={idx} path={path} exact={exact} component={ (args) => {
        return <LoadingHelper {...args} Component={pkg(componentPath)}/>;
      } } />;
      const childs = deepLoopRouter(children, path);
      return [ parent, ...childs ];
    }
    return deepLoopRouter(children, path);
  });
}

const RoutesComponents = deepLoopRouter(RouterInfoJson, '');
export { RoutesComponents, RouterInfoJson, NoPermissionRouteList };