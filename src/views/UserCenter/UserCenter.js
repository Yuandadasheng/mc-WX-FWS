import React ,{ Component} from 'react';
import {Icon ,Modal} from 'antd-mobile'
import TabBar from '@/component/TabBar/TabBar'
import { getSession } from '@/utils/mUtils'
import './UserCenter.scss'

// const alert = Modal.alert;
const SetListData=[
    {
        name : '我的账户',
        props : 'MyAccount',
        rightArrows : true,
        icon : require('@/asstes/imgs/wdzl.png')
    },
    {
        name : '修改密码',
        props : 'MyChangePWD',
        rightArrows : true,
        icon : require('@/asstes/imgs/mmxg.png')
    },
    {
        name : '切换账号',
        props : 'SwitchAccount',
        rightArrows : true,
        icon : require('@/asstes/imgs/qhzh.png')
    },
    {
        name : '退出登录',
        props : 'exit',
        rightArrows : false,
        icon : require('@/asstes/imgs/tc.png')
    }
]
class SetList extends Component{
    ship(val){
        if(val !== 'exit'){
            this.props.onClickShip(val);
        }else{
            // this.props.onExit();
            Modal.alert( '退出提示','您确定要退出当前账号???', [
                { text: '取消' },
                {
                  text: '确认退出',
                  onPress: () =>  this.props.onExit()
                    // new Promise((resolve) => {
                       
                    // }),
                },
              ])
        }
        
    }
    render(){
        const {items} = this.props
        return(
            <div className="SetList">
                <div className="set-item" onClick={this.ship.bind(this,items.props)}>
                    <div className="set-img">
                        <img src={items.icon} alt=""/>
                    </div>
                    <div className="set-ifo">
                        <span>
                            {items.name} 
                        </span>
                        { items.rightArrows ? <Icon type="right" size="md" /> :'' }
                        
                    </div>
                </div>
            </div>
        )
    }
}



class UserCenter extends Component{
    constructor(){
        super()
        this.state={
            selectedTab: 'UserCenter',
            token: getSession('accountToken'),
            content: {
                accountName : null,
                headPortraitUrl: null,
                phone: null
            }
        }
    }
    componentWillMount(){
        this.queryPersonalCenter();    
    }
    queryPersonalCenter(){
        // 微信公众号 - 服务商个人中心
        let data={
            token : this.state.token
        }
        
        this.$apis.queryPersonalCenter(data)
        .then(
            res=>{
                if(res.code === 1){
                    this.setState({
                        content : res.content
                    })
                }
            })
    }
    // tabBar 路由跳转
    onBarFun(e){
        this.props.history.push({ pathname : `/${e}`})
    }
    clickShip(val){
        this.props.history.push({ pathname : `/UserCenter/${val}`})
    }
    exitFun(){
        let data = {
            token : this.state.token
        }
        this.$apis.signOut(data).then(
            res=>{
                if(res.code === 1){
                    this.props.history.push({ pathname : `/`})
                }
            }
        )   
        
    }
    // signOut(){
       
    // }
    render(){
        return(
            <div className="page">
                <div className="Mian">
                    <div className="companyInfor">
                        <div className="HeadImg">
                            <img src={this.state.content.headPortraitUrl} alt="" />
                        </div>
                        <div className="company-infor">
                            <div className="company-name line-limit-length">
                                {this.state.content.accountName}
                            </div>
                            <div className="company-phone">手机 : {this.state.content.phone}</div>
                        </div>
                    </div>
                    { SetListData.map((item,index)=> 
                    <SetList 
                        onClickShip={this.clickShip.bind(this)}
                        onExit= { this.exitFun.bind(this)}
                        items={item}
                        key={index}/>)}
                   
                </div>
               
                <div className="TabBar">
                    <TabBar onBar = {this.onBarFun.bind(this)} selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}
export default UserCenter;