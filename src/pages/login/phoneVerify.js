import { useEffect, useState } from 'react';
import { MobileOutlined } from '@ant-design/icons';
import {
  Form, 
  Input,
  Button,
  Col,
  Row
} from 'antd';

const PhoneVertify = (props) => {
  const { name } = props;
  
  const getPhoneCode = () => {

  };
  const [ tipNumber, setTipNumber ] = useState(15);
  const [ start, setStart ] = useState(false);
  useEffect(() => {
    console.log(tipNumber);
    var timerId;
    if (start === true) {
      timerId = setTimeout(() => {
        setTipNumber(v =>{
          let k = v;
          k-=1;
          k <= 0 && setStart(!start);
          return k;
        });
      }, 1000);
    }
    return () => timerId && clearTimeout(timerId);
  }, [ start, tipNumber ]);
  return <Form.Item name = { name ? name : 'phone'}>
    <Row gutter={8}>
      <Col span={16}>
        <Input
          placeholder='手机短信验证码'
          prefix={<MobileOutlined />}
          size='large'/>
      </Col>
      <Col span={8} className="btn">
        <Button size="large" onClick={() => {
          if (start === true ) return;
          tipNumber <= 0 && setTipNumber(10);
          setStart(true);
        }}>{ start === true ? `${tipNumber}秒再试` : '获取验证码' }</Button>
      </Col>
    </Row>
  </Form.Item>;
};

export default PhoneVertify;