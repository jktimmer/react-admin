import { Spin } from 'antd';

function SpLoading() {
  return <div style={{ display: 'flex',height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
    <Spin size="large" />
  </div>;
}
export default SpLoading;