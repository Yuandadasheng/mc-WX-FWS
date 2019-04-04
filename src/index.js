import React from 'react';
import ReactDOM from 'react-dom';
// import {HashRouter} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Root from './router';
import * as serviceWorker from '@/serviceWorker';
import 'react-flexible';
import 'antd-mobile/dist/antd-mobile.css';
import  {apis}  from '@/utils/apis'
import '@/index.scss'


React.Component.prototype.$apis = apis;
ReactDOM.render(
     <BrowserRouter>
        <Root />
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
