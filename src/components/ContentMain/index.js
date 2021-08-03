import { Suspense } from 'react';
import { 
  Switch, Route, Redirect, useLocation,
} from 'react-router-dom';
import { RoutesComponents } from '@routes/index';

import React from 'react';
import { SpLoading } from '@pages/loading/index';
import { hot } from 'react-hot-loader/root';

function ContentMain(props){
  const location = useLocation();
  return (
    <div style={({ 'padding': '0 20px', 'position': 'relative', overflow: 'hidden' })}>
      <Suspense fallback={ SpLoading() }>
        <Switch location={location}>
          {
            RoutesComponents
          }
          <Route path='*'>
            <Redirect to='/404' />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
export default hot(ContentMain);