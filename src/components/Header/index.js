import { 
  Layout, Dropdown, Avatar, Space, Row, Col
} from 'antd';
import React, { useEffect } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { _Actions } from '@store/actions/index';
import { connect } from 'react-redux';
import HeaderOverlayMenu from './overlayMenu';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router';
import { Fragment } from 'react';
import { NoPermissionRouteList, RouterInfoJson } from '@routes/index';
const {
  Header
} = Layout;
function HeaderLayout(props) {
  const { collapsed, changeCollapsed, getUserInfo, userInfo } = props;
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const toggle = () => {
    changeCollapsed(!collapsed);
  };
  const dealPermissions = (permissionObj) =>{
    let obj = {};
    try {
      obj = JSON.parse(permissionObj);
    } catch (error) {
      console.log(error);
    }
    let noLen = NoPermissionRouteList.length;
    for (let ni = 0; ni < noLen; ni++){
      let nitem = NoPermissionRouteList[ni];
      if (pathname === nitem || pathname === '/404' || pathname === '/nopermission') return;
    }
    let keys = Object.keys(obj);
    let len = keys.length;
    for (let i = 0; i < len; i++){
      let itemKey = keys[i];
      if (pathname.indexOf(itemKey) >= 0 ){
        let itemArray = obj[itemKey];
        if (itemArray.includes('*')) {
          return;
        }
        if (!itemArray.includes(pathname)) {
          history.replace({
            pathname: '/nopermission'
          });
          return;
        }
      } else {
        history.replace({
          pathname: '/nopermission'
        });
        return;
      };
    }
  };
  useEffect(() => {
    getUserInfo()
      .then(res =>{
        const { isSuper, perms=[] } = res;
        if (isSuper === 0) {
          dealPermissions(perms[0]);
          return;
        }
      })
      .catch(err => console.log(err));

    return () => null;
  }, [ pathname ]);
  const showTitle = () =>{
    let { pathname } = location;
    let array = [];
    RouterInfoJson.forEach(element => {
      let { children, path, name } = element;
      if (path === pathname) {
        array.push(name);
      }
      if (Array.isArray(children)) {
        children.forEach(item => {
          if (item.path === pathname) {
            array.push(...[ name, item.name ]);
          } 
        });
      }     
    });
    if (array.length === 0) {
      return '';
    }
    return <Fragment>
      <div style={{ fontSize: 14 }}><span style={{ color: '#999999' }}>{array[0] || ''}</span>&nbsp;{array[1] ? '/' : '' }&nbsp;<span style={{ color: '#7899e5' }}>{array[1] || ''}</span></div>
    </Fragment>;
  };
  return (
    <Fragment>
      <Header className="site-layout-background" style={{ padding: '0px 16px', backgroundColor: '#fff' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggle
        })}
        <div style={{ float: 'right',position: 'relative' }}>
          <Space>
            <Dropdown
              overlay={ () => <HeaderOverlayMenu {...{ location, history }}/>}
              // trigger={[ 'click' ]}
              placement="bottomRight">
              <a style={{ display: 'inline-block', height:'100%', color:'#000' }} onClick={(e) => e.preventDefault()}>
                { userInfo['avatarUrl'] ? <Avatar size={32} src={userInfo['avatarUrl']}/> : <Avatar size={32} icon={<UserOutlined />}/>}
                &nbsp;
                &nbsp;
                Hi,{ userInfo['username']}
                &nbsp;
                <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        </div>
      </Header>
      <Row justify='flex-start' style={{ margin: '20px 0 0 40px' }}>
        <Col span={24}>{ showTitle() }</Col>
      </Row>
    </Fragment>
  );
}
function mapStateProps(state){
  return {
    collapsed: state.collapsed,
    userInfo: state.userInfo
  };
}
function mapDispatchProps(dispatch){
  return {
    changeCollapsed: (collapsed) => dispatch(_Actions.collapsed(collapsed)),
    getUserInfo: () => dispatch(_Actions.getUserInfo({}))
  };
}
export default connect(mapStateProps, mapDispatchProps)(HeaderLayout);