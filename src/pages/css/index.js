import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ROUTES from './routes';
import Box from './Box';

class Css extends Component {
  render() {
    //   Router 路由判断路径的时候，会判断当前path是什么，根据path判断渲染哪个组件
    //  组件也可以继续使用router判断下一级路由应该渲染什么组件，但是不能写父组件对应的路由，死循环
    // return <div>css</div>;
    return <Box></Box>;
    return (
      <Switch>
        <Route exact path='/css' component={Box}></Route>
        <Route path='/css/box' component={Box}></Route>

        {/* {ROUTES.map((route) => (
          <Route path={route.path} component={route.component} key={route.path} />
        ))} */}
        <Redirect to='/css'></Redirect>
      </Switch>
    );
  }
}

export default Css;
