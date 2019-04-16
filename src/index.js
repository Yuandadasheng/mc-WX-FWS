import React from 'react';
import ReactDOM from 'react-dom';
// import {HashRouter} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Root from './router';
import { setSession  } from '@/utils/mUtils'
import * as serviceWorker from '@/serviceWorker';
import moment from 'moment';
import 'react-flexible';
import 'antd-mobile/dist/antd-mobile.css';
import  {apis}  from '@/utils/apis'
import '@/index.scss'

// iPhone X、iPhone XS
let isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
// iPhone XS Max
let isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
// iPhone XR
let isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;

// let specification;
if(isIPhoneX || isIPhoneXSMax || isIPhoneXR){
    // specification = 'isIPhoneX'
    setSession('specification','isIPhoneX')
    // $('#footer').css({"height":"0.75rem"});
}else{
    // specification = 'NoisIPhoneX'
    setSession('specification','NoisIPhoneX')
    // $('#footer').css({"height":"0.49rem"});
}


React.Component.prototype.$apis = apis;
React.Component.prototype.$moment  = moment;
ReactDOM.render(
     <BrowserRouter>
        <Root />
    </BrowserRouter>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
