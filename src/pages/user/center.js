import { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
  Avatar, Row, Col
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function UserCenter(props) {
  const { setLoading, userInfo } = props;
  useEffect(() =>{
    setLoading();
  },[]);
  const jsonData = [
    {
      name: '账号信息',
      items: [
        {
          name: '用户姓名',
          key: 'realname'
        },
        {
          name: '手机号码',
          key: 'phone'
        },
        {
          name: '用户角色',
          key: 'userName',
          render: (txt) =>{
            return txt === 1 ? '超级管理员' : '管理员';
          }
        }
      ]
    },
    {
      name: '安全设置',
      items: [
        {
          name: '用户账号',
          key: 'username'
        },
        {
          name: '设置密码',
          key: '-',
          render: () =>{
            return <Link to='/' onClick={ (e) =>{
              e.preventDefault();

            }}>修改密码</Link>;
          }
        },
      ]
    }
  ];

  const buildRowDom = () =>{
    return jsonData.map((item, idx) =>{
      let { name, items=[] } = item;
      return <Row justify='center' align='top' className='rowItem' key={idx}>
        <Col className='leftColItem'>
          <span>{ name }</span>
        </Col>
        <Col className='rightColItem'>
          {
            items.map((citem, cidx) =>{
              let { name, key, render } = citem;
              return <Row justify='space-between' align='middle' className='item' key={'c_' + cidx }>
                <Col>{ name }</Col>
                <Col className='itemCol'>{ render ? render(userInfo[key]) : (userInfo[key] || '') }</Col>
              </Row>;
            })
          }
        </Col>
      </Row>;
    });
  };
  return (<Fragment>
    <Row id='user_center' justify='center' align='top' gutter={[ 0,32 ]} style={{ 
      marginTop: 30, 
      width: '80%',
      minWidth: 600, 
      marginLeft: 'auto',
      marginRight: 'auto',
      flexDirection: 'column'
    }}>
      <Row justify='center' className='rowItem'>
        {
          userInfo['avatarUrl'] ? <Avatar size={120} src={userInfo['avatarUrl']}/> : <Avatar size={120} icon={<UserOutlined />}/>
        }
      </Row>
      {
        buildRowDom()
      }
    </Row>
  </Fragment>);
}
function mapStateProps(state){
  return {
    userInfo: state.userInfo
  };
}
export default connect(mapStateProps)(UserCenter);