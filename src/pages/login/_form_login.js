import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const _FormLogin = (props) => {
  const { onSub,setShowBox, className } = props;
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    onSub(values);
  };
  const [ form ] = Form.useForm();
  return (
    <div className={className}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        size="large"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名！'
            },
            {
              min: 6,
              message: '用户名长度不够！'
            }
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！'
            },
            {
              min: 6,
              message: '密码长度不够！'
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" style={{ float: 'right' }} onClick={
            (e) => {
              e.preventDefault();
              form.resetFields();
              setShowBox('findPwd');
            }
          }>
            忘记密码
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};
export default _FormLogin;