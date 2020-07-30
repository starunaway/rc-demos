import React, {Component} from 'react';
import {Layout} from 'antd';
import LeftNav from '@components/LeftNav';
import {Redirect, Switch, Route} from 'react-router-dom';
import ROUTES from '@constants/routes';
const {Sider, Content} = Layout;

export default () => (
  <Layout style={{height: '100%'}}>
    <Sider>
      <LeftNav></LeftNav>
    </Sider>
    <Layout>
      <Content>
        <Switch>
          {ROUTES.map((route) => (
            <Route path={route.path} component={route.component} key={route.path} />
          ))}

          <Redirect to='/home'></Redirect>
        </Switch>
      </Content>
    </Layout>
  </Layout>
);
