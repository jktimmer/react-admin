
import IndexRoutesPage from '@pages/base';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store/index';

import '@style/App.scss';
import { getToken } from '@/utils/auth';
import { _Actions } from '@/store/actions/index';

/*
import { useState, useEffect } from 'react';
import { HashRouter, useLocation, useHistory } from 'react-router-dom';
import {
  CSSTransition
} from 'react-transition-group';
function AnimationCom(props) {
  const location = useLocation();
  const history = useHistory();
  const [ inProp, setProp ] = useState(false);
  useEffect(() => {
    const k = history.listen((state, name) => {
      setProp(!inProp);
    });
    return () => k();
  }, [ inProp, history ]);
  
  return (
    <div style={{ height: '100vh', padding: 0, margin: 0 }}>
      { `${inProp}` }
      <CSSTransition
        in={inProp}
        classNames="fade"
        timeout={800} 
        key={location.pathname}>
        <IndexRoutesPage />
      </CSSTransition>
    </div>
  );
}
*/
const token = getToken() || '';
store.dispatch(_Actions.token(token));
// store.dispatch();
function App() {
  return <HashRouter>
    <Provider store={store}>
      <IndexRoutesPage />
    </Provider>
  </HashRouter>;
}
export default App;
