import React, {Component} from 'react';
import './index.less';
import ROUTES from '@constants/routes';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'antd';
const {SubMenu} = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKey: '',
    };
    this.menuNodes = this.getMenuNodes(ROUTES);
    this.openKey = '';
  }

  getOpenKeys = (item) => {
    const {pathname} = this.props.location;
    const cItem = item.children.find((child) => child.path === pathname);
    if (cItem) {
      this.openKey = item.path;
      this.state = {
        openKey: item.path,
      };
      //   this.setState({
      //     openKey: item.path,
      //   });
    }
  };

  getMenuNodes = (ROUTES) => {
    return ROUTES.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        );
      } else {
        this.getOpenKeys(item);
        return (
          <SubMenu key={item.path} title={item.name}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
    });
  };

  render() {
    const {pathname} = this.props.location;
    const {openKey} = this.state;
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <h1>react snips</h1>
        </Link>
        <Menu mode='inline' theme='dark' selectedKeys={[pathname]} defaultOpenKeys={[openKey]}>
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default withRouter(LeftNav);
