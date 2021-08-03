import { useEffect, useState } from 'react';
import FormLogin from './_form_login';
// import BGParticle from '@utils/BGParticle';
import { _Actions } from '@/store/actions/index';
import { useStore } from 'react-redux';
import { push } from 'react-router-redux';
import FormForgetPwd from './_form_forget_pwd';
import bgImg from '@assets/login/bg.png';
function Login( props ) {
  // const { history } = props;
  const store = useStore();
  // useEffect(()=>{
  //   var particle = new BGParticle('backgroundBox');
  //   particle && particle.init();
  //   return ()=>{
  //     particle.destory();
  //     particle = null;
  //   };
  // },[]);

  const [ showBox, setShowBoxStr ] = useState('login');
  function sub(params) {
    if (showBox === 'login'){
      store.dispatch(_Actions.login(params))
        .then(res => {
          store.dispatch(push('/'));
        })
        .catch(err => {
          console.log('');
        });
      return;
    }
    // setToken( Math.floor(Math.random() * 10000));
    // history && history.push('/');
  }
  return (
    <div className="login_main">
      <div className='login-page' id='login-page'>
        <div id='backgroundBox'>
          <img src={ bgImg} alt='bg'/>
        </div>
        <div className='container'>
          <FormLogin 
            type="login" 
            className={showBox === 'login' ? 'login-box-active login-box' : 'login-box-leave login-box'} 
            setShowBox={setShowBoxStr}
            onSub={ sub }/>
          <FormForgetPwd 
            type={showBox}
            className={showBox === 'findPwd' ? 'login-box-active login-box' : 'login-box-leave login-box'} 
            setShowBox={setShowBoxStr}
            onSub={ sub }/>
        </div>
      </div>
    </div>
  );
}



// const styles = {
//   backgroundBox:{
//     position:'fixed',
//     top:'0',
//     left:'0',
//     width:'100vw',
//     height:'100vh',
//     // backgroundImage:`url(${require('./img/bg5.jpg')})`,
//     backgroundColor:'white',
//     backgroundSize:'100% 100%'
//   },
//   focus: {
//     transform: 'scale(0.6)',
//     width: 40
//   },
//   focusHandLeft: {
//     transform: 'translateX(-42px) translateY(-15px) scale(0.7)',
//   },
//   focusHandRight: {
//     transform: 'translateX(42px) translateY(-15px) scale(0.7)',
//   },
//   focusArmsLeft: {
//     transform: 'translateY(-40px) translateX(-40px) scaleX(-1)'
//   },
//   focusArmsRight: {
//     transform: 'translateY(-40px) translateX(40px)'
//   }
// };

export default Login;