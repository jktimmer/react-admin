import { RouterInfoJson } from '@routes/index';
import { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'antd';
import SvgIcon from '../SvgIcon/index';
const styles = {
  nameSpan: {
    marginRight: 10
  }
};
@withRouter
export default class ContentMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      selectedKeys: []
    };
  }
  componentDidMount() {
    const { pathname } = this.props.location;
    const rank = pathname.split('/');
    switch (rank.length) {
    case 2 : //一级目录
      this.setState({
        selectedKeys: [ pathname ]
      });
      break;
    case 5 : //三级目录，要展开两个subMenu
      this.setState({
        selectedKeys: [ pathname ],
        openKeys: [ rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/') ]
      });
      break;
    default :
      this.setState({
        selectedKeys: [ pathname ],
        openKeys: [ pathname.substr(0, pathname.lastIndexOf('/')) ]
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    //当点击面包屑导航时，侧边栏要同步响应
    const { pathname } = nextProps.location;
    if (this.props.location.pathname !== pathname) {
      this.setState({
        selectedKeys: [ pathname ],
      });
    }
  }
  onOpenChange = (openKeys) => {
    //此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
    if (openKeys.length === 0 || openKeys.length === 1) {
      this.setState({
        openKeys
      });
      return;
    }

    //最新展开的菜单
    const latestOpenKey = openKeys[openKeys.length - 1];
    //判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
    //因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
    //只适用于3级菜单
    if (latestOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      });
    } else {
      this.setState({
        openKeys: [ latestOpenKey ]
      });
    }
  }
  renderTitle(args) {
    const { icon, name, svg } = args;
    if (icon){
      return <span><span style={styles.nameSpan} className={ `iconfont icon-${icon}` }></span>{name}</span>;
    }
    if (svg) {
      return <span><span style={styles.nameSpan}><SvgIcon svgName={svg}/></span>{name}</span>;
    }
    return <span >{name}</span>;
  }
  renderMenuItem = ({ 
    path, icon, name, componentPath, svg, hidden 
  }) => {
    if (hidden === true) return null; 
    if (((typeof componentPath == 'undefined') && (typeof children == 'undefined')) || (typeof path == 'undefined')) return null;
    return (
      <Menu.Item key={path}>
        <Link to={path} onClick={ (e) => {
          // 阻止再次跳转
          if (path === this.props.location.pathname) {
            e.preventDefault();
            return false;
          }
          return null;
        }}>
          { this.renderTitle({ icon, name, svg }) }
        </Link>
      </Menu.Item>
    );
  }

  renderSubMenu = ({
    path, icon, name, children, componentPath, svg, hidden
  }) => {
    if (hidden === true) return null;
    if (((typeof componentPath == 'undefined') && (typeof children == 'undefined')) || (typeof path == 'undefined')) return null;
    return (
      <Menu.SubMenu key={path} title={ this.renderTitle({ icon, name, svg }) }>
        {
          this.recursionChild(children)
        }
      </Menu.SubMenu>
    );
  }
  recursionChild(children) {
    return children && children.map(item => {
      const childs = item.children;
      if (childs && childs.length > 0) {
        const list = childs.filter( icm => icm.hidden !== true);
        return list.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item); 
      }
      return this.renderMenuItem(item);
    });
  }
  render() {
    const { openKeys, selectedKeys } = this.state;
    return (
      
      <Menu
        onOpenChange={this.onOpenChange}
        onClick={({ key }) => {
          const { toggle, collapsd, isMobile } = this.props;
          if (!collapsd && isMobile) toggle();
          this.setState({ selectedKeys: [ key ] });
        }}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        theme={this.props.theme ? this.props.theme : 'dark'}
        mode='inline'>
        {
          //RouterInfoJson.map((item, idx) => {
          // const { children } = item;
          //return children && children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item);
          //})
          this.recursionChild(RouterInfoJson)
        }
      </Menu>
    );
  }
}