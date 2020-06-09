import Clipboard from '@pages/clipboard';
import Home from '@pages/home';
const ROUTES = [
  {
    name: '首页',
    path: '/home',
    component: Home,
  },
  {
    name: '剪贴板复制',
    path: '/clipboard',
    component: Clipboard,
  },
];

export default ROUTES;
