import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserOutlined, LeftOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import {
  Form, 
  Input,
  Button,
  Col,
  Row
} from 'antd';
import GVerify from '@utils/gVerify';
import PhoneVertify from './phoneVerify';
function _FormForgetPwd(props) {
  const [ verifyCode, setVerifyCode ] = useState(null);
  // const [ inputList, setInputList ] = useState([]);
  const { onSub, className, setShowBox, type } = props;
  const [ form ] = Form.useForm();
  useEffect(() => {
    setVerifyCode(new GVerify('v_container'));
  }, [ type ]);

  
  const findPwdObjList = [
    {
      name: 'FindPwd_username',
      validateFirst: 'true',
      rules: [
        { min: 6, message: '用户名至少6个字符' },
        { required: true, message: '用户名不能为空' },
        { pattern: '^\\S+$', message: '不能输入空格' }
      ],
      input: {
        'placeholder': '用户名',
        addonBefore: () => <UserOutlined />,
        'type': 'normal',
        size: 'large',
      }
    },
    {
      name: 'register_pwd',
      validateFirst: 'true',
      rules: [
        { min: 6, message: '密码至少6个字符' },
        { required: true, message: '请输入密码' },
        { pattern: '^\\S+$', message: '不能输入空格' }
      ],
      input: {
        placeholder: '密码',
        addonBefore: ()=> <LockOutlined />,
        type: 'password',
        size: 'large'
      },
    },
    {
      name: 'confirm_pwd',
      validateFirst: 'true',
      rules: [
        { min: 6, message: '确认的密码至少6个字符' },
        { required: true, message: '请确认密码' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('pwd') === value) {
              return Promise.resolve(true);
            }
            return Promise.reject(new Error('两次输入不一致！'));
          },
        })
      ],
      input: {
        placeholder: '确认密码',
        addonBefore: ()=> <LockOutlined/>,
        type: 'password',
        size: 'large'
      }
    }
  ];
  const findPwdSubmit = (values) => {
    console.log(values);
    onSub(values);
  };
  function CodePromise(val){
    if (verifyCode && verifyCode.options.code.toLowerCase() === val) {
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }

  const renderConfirmBox = () => {
    return <Form.Item
      name='code'
      rules={
        [
          { required: true, message: '请填写验证码' },
          { transform: (v) => v ? v.toLowerCase() : v, validator:(rules, value) => CodePromise(value), message : '验证码有误' }
        ]}>
      <Row gutter={8}>
        <Col span={16}>
          <Input
            placeholder='验证码'
            prefix={<SafetyCertificateOutlined />}
            size='large'/>
        </Col>
        <Col span={8}>
          <div id='v_container' style={{ height: 40 }}/>
        </Col>
      </Row>
    </Form.Item>;
  };

  return (
    <div className={ className }>
      <div className='back'>
        <LeftOutlined />
        <span className='gobackBtn' onClick={ ()=> {
          form.resetFields();
          setShowBox('login');
        }}>返回登录</span>&emsp;
      </div>
      <Form onFinish={findPwdSubmit} form={form} name={type}>
        {
          findPwdObjList.map( (item,index) => {
            return <Form.Item
              key={index}
              label=''
              name={item.name}
              rules={item.rules}
              validateFirst={item.validateFirst}>
              { item.input.type === 'password'
                ? <Input.Password
                  placeholder={item.input.placeholder}
                  prefix={item.input.addonBefore()}
                  type={item.input.type}
                  size={item.input.size} />
                : <Input
                  placeholder={item.input.placeholder}
                  prefix={item.input.addonBefore()}
                  type={item.input.type}
                  size={item.input.size} />
              }
            </Form.Item>;
          })
        }
        { renderConfirmBox() }
        <PhoneVertify />
        <Form.Item>
          <Button block type='primary' htmlType="submit" className="ant-btn-lg">登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
_FormForgetPwd.propTypes = {
  type: PropTypes.string.isRequired
};
export default _FormForgetPwd;