import React ,{ Component} from 'react';
import {Button,Toast} from 'antd-mobile'
import  './SelectAccount.scss';
import {getSession,setSession,} from '@/utils/mUtils'
class AccountList extends Component{
   
    accountClick=(e)=>{
         for( let i in this.props.items){
             setSession(i ,this.props.items[i])
         }
         this.props.accountFun(this.props.index)
    }
    render(){
        const {items,index,accountIndex} = this.props;
        return(
            <div 
                ref="accountDom" 
                className={ [accountIndex === index ? 'clickColor' : '','account-list'].join(' ')}
                onClick={this.accountClick}>
                <div className="head-portrait">
                   <img className="img-style" src={items.headPortraitUrl} alt=""/>
                </div>
               
                <div className="account-infor">
                    <p className="account">
                        <span>
                            账号：{items.loginName}
                        </span>
                    </p>
                    <p className="account-infor-list">
                        <span className="account-infor-name line-limit-length">
                            姓名：{items.realName}
                        </span>
                        <span className="account-infor-addr line-limit-length">
                            地址： {items.areaName}
                        </span>
                    </p>
                </div>
            </div>
        )
    }
}
class SelectAccount extends Component{
    constructor(){
        super()
        this.state={
            accountIndex : null
        }
    }
    accountIndexFun(val){
      this.setState({
            accountIndex : val
         })
    }
    skip(){
      
        if(!this.state.accountIndex&& this.state.accountIndex !== 0){
            Toast.offline('*请选择账号!!!', 1);
            return false
        }
        this.props.history.push({ pathname : "/HomePage"})
    }
    render(){
        const loginAccount =  JSON.parse(getSession('loginAccountResList'));
        return(
            <div>
                {loginAccount.map((item,index)=> 
                        <AccountList 
                            items={item} 
                            index={index} 
                            key={index}
                            accountIndex ={ this.state.accountIndex}
                            accountFun = {this.accountIndexFun.bind(this)}/>
                            )} 
                <div className="account-submit">
                      <Button 
                        style={{
                        'width': "100%",
                        'height':'100%',
                        'background':'rgba(0,0,0,0)',    
                        'textAlign': 'center',
                        'fontSize': '0.5rem',
                        'lineHeight': '1.429rem',
                        'overflow':'hidden',
                        'textOverflow': 'ellipsis',
                        'wordBreak':' break-word',
                        'whiteSpace': 'nowrap',
                        'color': '#fff'}}
                        className="account-submit-but"
                        onClick={this.skip.bind(this)}
                        >登录</Button>
                </div>            
            </div>
        )
    }
}
export default SelectAccount;