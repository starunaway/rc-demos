import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Box from './Box';
import Routes from './routes';

class Css extends Component {
  render() {
    //   Router 路由判断路径的时候，会判断当前path是什么，根据path判断渲染哪个组件
    //  组件也可以继续使用router判断下一级路由应该渲染什么组件，但是不能写父组件对应的路由，死循环
    // return <div>css</div>;
    return (
      <Switch>
        <Route exact path='/css' component={Box}></Route>
        {Routes.map((route) => {
          return <Route path={route.path} component={route.component}></Route>;
        })}

        <Redirect to='/css'></Redirect>
      </Switch>
    );
  }
}

export default Css;
