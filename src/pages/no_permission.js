import { Link, useHistory } from 'react-router-dom';
import { Row, Button, Col } from 'antd';
import { Fragment } from 'react';

const NoPermission = (props) =>{
  const history = useHistory();
  return (
    <Fragment>
      <Row gutter={[ 0 ,20 ]} className="bx" style={{ textAlign: 'center',marginTop: 100 }}>
        <Col span={24}>
          <h2 style={{ marginTop: 40 }}>您没有权限！请联系管理员添加权限</h2>
        </Col>

        <Col span={24}>
          <div className="link" style={{ textAlign: 'center', marginTop: 20 }}>
            <p className="mbbig"><Link to="/">跳转至首页</Link></p>
            <Button type="primary" onClick={() => history.goBack()}>返回上一页</Button>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};
export default NoPermission;