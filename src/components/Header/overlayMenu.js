import { Menu } from 'antd'; 
import { removeToken } from '@utils/auth'; 
import { Link } from 'react-router-dom';
import ApiMap from '@api/index';

function HeaderOverlayMenu(props) {
  const { history ,location } = props;
  const list = [ {
    name: '个人中心',
    path: '/userCenter',
    type: 'go'
  }, 
  {
    name: '退出登录',
    path: '-',
    type: 'exit'
  }
  ];
  const itemClick = (e,type) => {
    console.log(e, type);
    if (type === 'exit') {
      e.preventDefault();
      ApiMap.logout()
        .then(res => {
          removeToken();
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          removeToken();
          window.location.reload();
        });
      // history.push('/',location);
    }
  };
  return (
    <Menu>
      {list.map((item,idx) => {
        return <Menu.Item key={idx}>
          <Link to={item.path} onClick={(e) => {
            itemClick(e, item.type);
            return false;
          }}>{ item.name }</Link>
        </Menu.Item>;
      })}
    </Menu>
  );

}
export default HeaderOverlayMenu;