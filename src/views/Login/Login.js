import React ,{ Component} from 'react';
import {Button,Toast} from 'antd-mobile'
import  './Login.scss';
import {setSession ,setLocal,getLocal,clearSession} from '@/utils/mUtils'

const imgLogo = require('@/asstes/imgs/dllogo.png');

class InputEl  extends Component{ //input输入 
    handleVal=()=>{
      let val = this.refs.emailDom.value;
      if( this.refs.emailDom.name === 'username'){
          this.props.handleName(val);
      }else{
          this.props.handlePwd(val);
      }
    }
    render(){
        const {items ,inputData   }= this.props
        let userData;
        if( items.name === 'username'){
           userData = inputData.username
        }else{
           userData = inputData.pwd
        }
        return(
          <div className="field">
              <div className="icon-ident">
                    <i className= {[items.className , 'icon' ].join(' ')} ></i>
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

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            pwd: ''
        }
    }
    componentDidMount(){
     let loginName = getLocal("loginName"); 
     let loginPassword = getLocal("loginPassword");
     if(loginName&&loginPassword){
        this.setState({
          username: loginName,
          pwd: loginPassword
      })
     }
    }
    // 获取用户名
    handleNameFun(event){
        this.setState({username: event});
    }
    // 获取密码
    handlePwdFun(event){
      this.setState({pwd: event});
    }
    // 提交
    submit(){
      if(!this.state.username){
        // this.$message.error('设备类型不能为空')
        Toast.offline('*请输入账号!!!', 1);
        return false
      }
      if(!this.state.pwd){
        // this.$message.error('设备名称不能为空')
        Toast.offline('*请输入密码!!!', 1);
        return false
      }
      let data={
        "loginName": this.state.username,
        "loginPassword": this.state.pwd
      }
      this.$apis.facilitatorLogin(data)
        .then(res =>{
              if(res.code === 1){
                  setLocal("loginName", this.state.username);
                  setLocal("loginPassword", this.state.pwd);
                  clearSession()
               
                      if(res.content.markId === 1){
                          (res.content.loginAccountResList).map( 
                            // eslint-disable-next-line array-callback-return
                            (item)=>{
                              for(let  i in item){
                                  setSession(i,item[i])
                              }
                           
                              this.props.history.push({ pathname : "/HomePage"})
                              // this.props.history.push("/SelectAccount")
                          })
                      }else{
                        
                          setSession('loginAccountResList',res.content.loginAccountResList)
                  
                          this.props.history.push({ pathname : "/SelectAccount"})
                     
                      }
                  
              }else{
                Toast.offline(res.msg, 1);
              }
          })
      
    }
    render(){
      const inputStyle = [
        {
          className : 'user',
          type: 'text',
          placeholder : '请输入登录账号',
          name: 'username'
        },
        {
          className : 'pwd',
          type: 'password',
          placeholder : '登录密码',
          name: 'userpwd'
        }
      ]
      return(
        <div className="logoPage">
            <div className="logoStyle">
                <img className="" alt=""  src={imgLogo}/>
            </div>
            <div className="login">
               {inputStyle.map((item,index)=> <InputEl items={item} key={index} 
                    inputData = {this.state}
                    handlePwd={this.handlePwdFun.bind(this)}
                    handleName={this.handleNameFun.bind(this)}/>)}
               <div className="submit">
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
                        className="submit-but"
                        onClick={this.submit.bind(this)}
                        >登录</Button>
                </div>
            </div>
          
        </div>
      )
    }
}

export default Login;