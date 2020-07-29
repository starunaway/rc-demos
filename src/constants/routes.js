import Clipboard from '@pages/clipboard';
import Home from '@pages/home';
import ExportExcel from '@pages/exportExcel';
import Video from '@pages/video';
import Css from '@pages/css';
import Katex from '@pages/katex';
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
    children: [
      {
        name: 'css画格子',
        path: '/css/box',
      },
    ],
  },
  {
    name: 'Katex',
    path: '/katex',
    component: Katex,
  },
  {
    name: '视频播放',
    path: '/video',
    component: Video,
  },
];

export default ROUTES;
