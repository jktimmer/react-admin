// import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Progress, Button } from 'antd';
import style from '@style/notfound.module.scss';
function Notfound() {
  const history = useHistory();
  return (
    <div className={ style.fzt }>
      <div className="bx">
        <Progress
          type="circle"
          percent={100}
          format={() => '404'}
          width={200}
          status="active"
        />

        <div className="link" style={{ textAlign: 'center', marginTop: 20 }}>
          <p className="mbbig"><Link to="/">跳转至首页</Link></p>
          <Button type="primary" onClick={() => history.goBack()}>返回上一页</Button>
        </div>
      </div>
    </div>
  );
}
export default Notfound;

