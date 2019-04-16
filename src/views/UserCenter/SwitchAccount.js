import React ,{ Component} from 'react';
import { setSession ,getSession,clearSession} from '@/utils/mUtils'
import { Button ,Toast } from 'antd-mobile'
import './SwitchAccount.scss'


class AccountLists extends Component{
    selectAccount(val,id){
        this.props.selectSwitch(val,id);
    }
    render(){
        const {items,index,switchId} = this.props;
        return(
            <div className={[index===switchId ? 'switchBg' : '',"AccountLists"].join(' ')}
                 onClick={this.selectAccount.bind(this,index,items.id)}>
                <div className="account-item">
                    <div className="account-item-img">
                        <img  src={items.headPortraitUrl} alt=""/>
                    </div>
                    <div className="account-item-info">
                        <span className="account">
                            账号： {items.phone}  
                        </span>
                        <span className="name">
                            姓名： {items.realName}  
                        </span>
                        <span className="area">
                            地址： {items.areaName}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
class SwitchAccount extends Component{
    constructor(){
        super()
        this.state={
            selectedTab: 'UserCenter',
            token: getSession('accountToken'),
            content : null,
            switchId: null,
            switchAccountId : null
        }
    }
    componentWillMount(){
        this.switchAccount()
    }
    switchAccount(){
        let data ={
            token : this.state.token
        }
        this.$apis.switchAccount(data)
            .then(
                (res) =>{
                    if(res.code === 1){
                        this.setState({
                            content : res.content
                        })
                    }
                }
            )
    }
    SwitchFun(val,id){
        this.setState({
            switchId : val,
            switchAccountId : id
        })
    }
    goBack(){
        this.props.history.goBack()
    }
    ConfirmSwitch(){
        if(!this.state.switchAccountId){
            Toast.offline('*请选择账号!!!', 1);
            return false
        }
        let data={
            facilitatorId: this.state.switchAccountId,
            token: this.state.token
        }
        this.$apis.confirmSwitchAccount(data)
        .then(
            res =>{
                  if(res.code === 1){
                      clearSession();
                      setSession('accountToken' , res.content.accountToken);
                      this.props.history.push({ pathname : `/HomePage`})
                  }  
            }
        )
        
    }
    render(){
        const { content} = this.state;
        return(
            <div className="SwitchAccount">
              {
                 content ? content.map((item,index) => <AccountLists 
                    selectSwitch = {this.SwitchFun.bind(this)}
                    index={index} 
                    items={item}  
                    switchId = {this.state.switchId}
                    key={index}/> )  :null
              } 
               <div className="but">
                     <Button 
                        className="submit-but submit-but-1"
                        onClick={this.goBack.bind(this)}
                        >返回</Button>
                    <Button 
                        className="submit-but submit-but-2"
                        onClick={this.ConfirmSwitch.bind(this)}
                        >确认切换</Button>
               </div>
            </div>
        )
    }
}
export default SwitchAccount;