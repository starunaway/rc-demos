import Clipboard from '@pages/clipboard';
import Home from '@pages/home';
import ExportExcel from '@pages/exportExcel';
import Css from '@pages/css';
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
  {
    name: '导出Excel',
    path: '/exportExcel',
    component: ExportExcel,
  },
  {
    name: 'Css',
    path: '/css',
    component: Css,
    // children: [
    //   {
    //     name: 'css画格子',
    //     path: '/css/box',
    //   },
    // ],
  },
];

export default ROUTES;
