import { Layout, Drawer } from 'antd';
import SiderNavBar from './index';
import ChangeTheme from './changeThemeLayout';
import { connect } from 'react-redux';
import { _Actions } from '@/store/actions/index';
import { useEffect, useState } from 'react';
const { 
  Sider
} = Layout;
function SiderLayout(props) {
  const { collapsed, theme, changeStoreTheme, changeCollapsed } = props;
  const [ isMobile, setMobile ] = useState(false);
  const [ resizeTimerId, setResizeTimerId ] = useState(null);
  
  useEffect(() => {
    if (!resizeTimerId) {
      screenListener();
    }
    window.addEventListener('resize',screenListener);
    return () => {
      window.removeEventListener('resize', screenListener);
    };
  },[ isMobile, resizeTimerId ]);
  const screenListener = (e) => {
    if ( resizeTimerId ) clearTimeout(resizeTimerId);
    const timer = setTimeout(() => {
      let width = document.body.offsetWidth;
      setMobile(width <= 800);
    }, 1000);
    setResizeTimerId(timer);
  };
  const changeTheme = () => {
    changeStoreTheme(
      theme === 'dark' ? 'light' : 'dark'
    );
  };
  const toggle = () => {
    changeCollapsed(!collapsed);
  };
  return (
    <div style={ { zIndex: 1 }}>
      { isMobile ? 
        <Drawer
          maskClosable
          closable={false}
          onClose={ toggle }
          visible={!collapsed}
          placement="left"
          width={200}
          style={{
            padding: 0,
            height: '100vh',
          }}
        >
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme={theme}
            collapsible
            trigger={null}
            collapsed={collapsed}>
            <div style={{ height: '100vh' }}>
              <SiderNavBar { 
                ...{ theme, collapsed, isMobile }
              }
              toggle={toggle}
              />
              { !collapsed && <ChangeTheme theme={ theme } change={ changeTheme } /> }
            </div>
          </Sider>
        </Drawer> 
        : <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme={theme}
          collapsible
          trigger={null}
          collapsed={collapsed}>
          <div style={{ height: '100vh' }}>
            <SiderNavBar 
              { ...{ theme, collapsed, isMobile } }
              toggle={toggle}
            />
            { !collapsed && <ChangeTheme theme={ theme } change={ changeTheme } /> }
          </div>
        </Sider>
      }
    </div>
  );
}
function mapStateProps(state){
  return {
    theme: state.theme,
    collapsed: state.collapsed
  };
}
function mapDispatchProps(dispatch){
  return {
    changeStoreTheme: (theme) => dispatch(_Actions.theme(theme)),
    changeCollapsed: (collapsed) => dispatch(_Actions.collapsed(collapsed))
  };
}
export default connect(mapStateProps, mapDispatchProps)(SiderLayout);