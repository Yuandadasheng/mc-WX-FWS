import React from 'react';
import {  Route ,Redirect,Switch } from 'react-router-dom'


import Login from '@/views/Login/Login'
import SelectAccount from '@/views/SelectAccount/SelectAccount'
import HomePage from '@/views/HomePage/HomePage'
import Transaction from '@/views/Transaction/Transaction'
import MyDevice from '@/views/MyDevice/MyDevice'
import MyShopList from '@/views/MyShopList/MyShopList'
import UserCenter from '@/views/UserCenter/UserCenter'
import MyAccount from '@/views/UserCenter/MyAccount'
import MyChangePWD from '@/views/UserCenter/MyChangePWD'
import SwitchAccount from '@/views/UserCenter/SwitchAccount'
import MyShopInfo from '@/views/MyShopInfo/MyShopInfo'

const UserCenterList = ({ match }) =>(
    <div>
        <Switch>
            <Route path = {match.path} exact component={UserCenter} />
            <Route path = {`${match.path}/MyAccount`}  exact component={MyAccount} />
            <Route path = {`${match.path}/MyChangePWD`}  exact   component={MyChangePWD} />
            <Route path = {`${match.path}/SwitchAccount`} exact    component={SwitchAccount} />
        </Switch>
    </div>
)
const Root = () =>{
    return(
        <div>
            <Switch>
                <Route path="/" exact component = {Login} />
                <Route path="/SelectAccount"  component = {SelectAccount} />
                <Route path="/HomePage"  component = {HomePage} />
                <Route path="/Transaction"  component = {Transaction} />
                <Route path="/MyDevice"  component = {MyDevice} />
                <Route path="/MyShopList"  component = {MyShopList} />
                <Route path="/UserCenter"  component = {UserCenterList} />
                <Route path="/MyShopInfo"  component = {MyShopInfo} />
                <Redirect to ="/" />
            </Switch>
        </div> 
    )
}

export default Root;