import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';

function Animated(props) {
  const { children, timeout, classNames, keyitem } = props;
  const history = useHistory();
  const location = useLocation();
  // const [ inProp, setInProp ] = useState(keyitem);
  // useEffect(() => {
  //   var kh = history.listen((location, method)=>{
  //     // setInProp(location.pathname);
  //   });
  //   return () => kh();
  // }, [ inProp, history ]);
  return <div style={{ overflow: 'hidden' }}>
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout= {timeout || 1000}
        classNames={classNames}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  </div>; 
}
export default Animated;