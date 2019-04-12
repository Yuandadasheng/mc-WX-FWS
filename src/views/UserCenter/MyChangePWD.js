import React ,{ Component} from 'react';
import { getSession ,isTokenValid } from '@/utils/mUtils'
import {Icon,Button ,Toast } from 'antd-mobile'
import './MyChangePWD.scss'

class UpdateInputEl  extends Component{ //input输入 
    handleVal=()=>{
        let val = this.refs.emailDom.value;
        if( this.refs.emailDom.name === 'oldPassWord'){
            this.props.oldPassWord(val);
        }else if(this.refs.emailDom.name === 'newPassWord'){
            this.props.newPassWord(val);
        }else{
            this.props.retypePassWord(val);
        }
    }
    render(){
        const {items   }= this.props
        let userData;
       
        return(
          <div className="field">
              <div className="icon-ident">
                    {items.inputName}
              </div>
              <div className="input-data">
                  <input 
                      className="input-style" 
                      placeholder = {items.placeholder}
                      type={items.type}
                      name ={items.name}
                      ref="emailDom" 
                      value = {userData}
                      onChange={this.handleVal} />
              </div> 
          </div>
        ) 
    }
}

class MyChangePWD extends Component{
    constructor(){
        super()
        this.state={
            token: getSession('accountToken'),
            oldPassWord: '',
            newPassWord: '',
            retypePassWord:''
        }
    }
    componentDidMount(){
        isTokenValid(this.props)
    }
    goBack(){
        this.props.history.goBack()
    }
    updatePassword(){
        let data={
            token : this.state.token,
            newPassWord : this.state.newPassWord,
            oldPassWord : this.state.oldPassWord
        }
        this.$apis.updatePassword(data)
        .then(
            res => {
                if(res.code === 1){
                    Toast.success('密码修改成功！请重新登录 !', 1);
                    this.setState({
                        oldPassWord: '',
                        newPassWord: '',
                        retypePassWord:''
                    })
                    window.setTimeout(()=>{
                        this.props.history.push({ pathname : `/`})   
                    }, 1000);
              
                }else{
                    Toast.offline(res.msg, 1);
                }
            }
        )
    }
     // 获取用户名
     oldPassWordFun(event){
        this.setState({oldPassWord: event});
    }
    // 获取密码
    newPassWordFun(event){
       this.setState({ newPassWord : event});
    }
    retypePassWordFun(event){
        this.setState({ retypePassWord : event});
    }
    submitUpdate(){
        if(!this.state.oldPassWord){
            Toast.offline('*请输入当前密码!!!', 1);
            return false
        }
        if(!this.state.newPassWord){
            Toast.offline('*请输入新密码!!!', 1);
            return false
        }   
        if(!this.state.retypePassWord){
            Toast.offline('*请输入确认新密码!!!', 1);
            return false
        } 
        if(this.state.newPassWord !== this.state.retypePassWord){
            Toast.offline('*两次输入的密码不一致!!!', 1);
            return false
        } 
        this.updatePassword();
    }
    render(){
        const updateInput = [
            {
              className : 'oldPassWord',
              type: 'password',
              inputName : '当前密码：',
              placeholder : '请输入当前密码',
              name: 'oldPassWord'
            },
            {
              className : 'newPassWord',
              type: 'password',
              inputName : '新密码：',
              placeholder : '请输入新密码',
              name: 'newPassWord'
            },
            {
              className : 'retypePassWord',
              type: 'password',
              inputName : '确认新密码：',
              placeholder : '请再次输入新密码',
              name: 'retypePassWord'
            }
          ]
        return(
            <div className="MyChangePWD">
                <div className="header">
                    <div className="left-arrows" onClick={this.goBack.bind(this)}>
                         <Icon type="left" size="lg" />   
                    </div>
                    <div className="title">
                        <span className="title-text">
                            修改密码
                        </span>
                    </div>
                </div>
                <div className="container">
                    {updateInput.map((item,index)=> <UpdateInputEl 
                        items={item} 
                        key={index} 
                        oldPassWord={this.oldPassWordFun.bind(this)}
                        newPassWord={this.newPassWordFun.bind(this)}
                        retypePassWord={this.retypePassWordFun.bind(this)}/>)}
                </div>
                <div className="update-but">
                    <Button 
                        className="submit-but"
                        onClick={this.submitUpdate.bind(this)}
                        >提交</Button>
                </div>
               
            </div>
        )
    }
}
export default MyChangePWD;