
import React, { Component } from 'react';
import { Layout } from 'antd';

import ContentMain from '@components/ContentMain/index';
// import Animated from '@components/Animated/index';
import '@style/base_app.scss';
import '@style/credit.scss';
import '@style/login.scss';
import '@style/user_center.scss';
import SiderLayout from '@components/SiderNav/layout';
import HeaderLayout from '@components/Header/index';
const {
  Content
} = Layout;


class BaseApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: props.location
    };
  }
  render() {
    const { location } = this.state;
    return (
      <div id='base_page'>
        <Layout style={{ height: '100vh', overflow: 'hidden' }}>
          <SiderLayout />
          <Layout className='site-layout'>
            <HeaderLayout />
            <Content
              className="site-layout-background"
            >
              <ContentMain { ...{ location }}/>
              {/* <Animated classNames='router-in' keyItem={location.pathname}>
                <ContentMain />
              </Animated> */}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default BaseApp;
