import React ,{ Component} from 'react';
import { getSession ,isTokenValid} from '@/utils/mUtils'
import {Icon} from 'antd-mobile'
import './MyAccount.scss'
const AccountListData=[
    {
        name: '服务商名称：',
        props: 'facilitatorName'
    },{
        name: '下属商户数：',
        props: 'numberOfMerchant'
    },{
        name: '下属机器数：',
        props: 'numberOfTerminal'
    },{
        name: '负责人：',
        props: 'realName'
    },{
        name: '地址：',
        props: 'areaName'
    },{
        name: '联系电话：',
        props: 'phone'
    },{
        name: '开户行：',
        props: 'bankName'
    },{
        name: '银行账户：',
        props: 'bankCardNo'
    }
]
class AccountInfo extends Component{
    render(){
        const { content ,items} = this.props;
        return(
            <div className="account-info" >
                <div className="account-name">
                    {items.name}
                </div>
                <div className="account-info-1">
                    {content[items.props]}
                </div>
            </div>
        )
    }
}
class MyAccount extends Component{
    constructor(){
        super()
        this.state={
            token: getSession('accountToken'),
            content: {
                areaName: null,
                bankCardNo: null,
                bankName: null,
                facilitatorName: null,
                numberOfMerchant: null,
                numberOfTerminal: null,
                phone: null,
                realName: null
            },
        }
    }
    componentDidMount(){
        isTokenValid(this.props)
        this.queryAccount();    
    }
    queryAccount(){
        let data={
            token : this.state.token
        }
        this.$apis.queryAccount(data).then(
            res=>{
                if(res.code === 1){
                    this.setState({
                        content : res.content 
                    }) 
                }
            }
        )
    }
    goBack(){
        this.props.history.goBack()
    }
    render(){
        return(
            <div className="account">
                <div className="header">
                    <div className="left-arrows" onClick={this.goBack.bind(this)}>
                         <Icon type="left" size="lg" />   
                    </div>
                    <div className="title">
                        <span className="title-text">
                            我的账户
                        </span>
                    </div>
                </div>
                {AccountListData.map((item,index)=>{
                    return(
                        <AccountInfo
                        items={item}
                        content ={this.state.content}
                        key={index} />
                    )}
                  )}
               
            </div>
        )
    }
}
export default MyAccount;