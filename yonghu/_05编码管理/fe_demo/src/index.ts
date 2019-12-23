import dva from 'dva';
import RouterView from './router'; //引入路由表
import { createModel } from './store';

import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
// import './index.css';

import 'antd-mobile/dist/antd-mobile.css';
//创建browerhistory路由
//传入dva中，dva相当于把整个封装了
let creatBR = require('history').createBrowserHistory;

const app = dva({
    //路由模式成为了BrowerHistory
    history: creatBR(),
});
createModel(app);
app.router(RouterView);
app.start('#root');

