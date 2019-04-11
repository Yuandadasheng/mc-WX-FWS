import React ,{ Component} from 'react';
import { getSession } from '@/utils/mUtils'
import {Icon} from 'antd-mobile'
import Moment from 'react-moment';
import 'moment-timezone';
import './MyShopInfo.scss'

const ShopInfoData=[
    {
        name : '商户名称',
        prop: 'merchantName',
    },
    {
        name : '下属机器数',
        prop: 'numberOfTerminal',
    },
    {
        name : '负责人',
        prop: 'realName',
    },
    {
        name : '地址',
        prop: 'areaName',
    },
    {
        name : '电话',
        prop: 'phone',
    },
    {
        name : '授权时间：',
        prop: 'create_time',
    },
    {
        name : '开户行：',
        prop: 'bankName',
    },
    {
        name : '银行账户：',
        prop: 'bankCardNo',
    }
]
class ShopInfoList extends Component{
    render(){
        const {obj,items} = this.props
        return(
            <div className="ShopInfoList ">
                <span className="name">
                    {items.name}:
                </span>
                <span className="prop">
                   {
                       items.prop === 'create_time' ? items.prop?
                       <Moment format="YYYY-MM-DD" date={obj[items.prop]} locale="CH"/> 
                       :' ' 
                       :  items.prop === 'phone'?
                       <span 
                       style={{color : '#454545'}}
                       onClick={()=>{
                        window.location.href = 'tel://' + obj[items.prop];
                        }}
                       >{obj[items.prop]}</span>: obj[items.prop]

                   }
                </span>
                
            </div>
        )
    }
}
class MyShopInfo extends Component{
    constructor(props){
        super(props)
        const { id } = this.props.location.state;
        const token = getSession('accountToken')
        this.state={
            id,
            token,
            inventoryAndTerminalNum : null,
            inventoryChangeNum: null,
            content:null
        }
    }
    componentDidMount(){
        this.queryMyMerchantInformation()
    }
    goBack(){
        this.props.history.goBack()
    }
    queryMyMerchantInformation(){
        let data={
            token : this.state.token,
            merchantAccountId : this.state.id
        }
        this.$apis.queryMyMerchantInformation(data)
            .then(
                res=>{
                    if(res.code  === 1){
                        this.setState({
                            inventoryAndTerminalNum : res.content.inventoryAndTerminalNum,
                            inventoryChangeNum: res.content.inventoryChangeNum,
                            content: res.content
                        })
                    }
                }
            )
    }
    render(){
        // const { id } = this.state
        return(
            <div className="MyShopInfo">
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
                <div className="poll">
                    <div className="merchantPoll">
                        <div className="merchantPollInfor">
                            <span className="title">商户余票总数（商户仓+设备仓）</span>
                            <span className="number">{this.state.inventoryAndTerminalNum}张</span>
                        </div>  
                    </div>
                    <div className="facilitatorPoll">
                            <span>服务商出票总数：</span><span>{this.state.inventoryChangeNum}张</span>
                    </div>
                </div>
                <div className="content">
                    {
                       this.state.content ? 
                        ShopInfoData.map((item,index)=><ShopInfoList obj ={this.state.content} items={item} key= {index}/>) 
                        :''
                    }
                </div>
            </div>
        )
    }
}
export default MyShopInfo;