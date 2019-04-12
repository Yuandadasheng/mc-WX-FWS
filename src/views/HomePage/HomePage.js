import React ,{ Component} from 'react';
import TabBar from '@/component/TabBar/TabBar'
import { getSession,isTokenValid } from '@/utils/mUtils'
import Moment from 'react-moment';
import 'moment-timezone';
import './HomePage.scss'

const HeaderTitle= (props) =>{
    const {accountName,currentTime}=props;
    return(
        <div className="HeaderTitle"> 
            <div className="head-admin line-limit-length">
             <span>欢迎您，</span>
             <span className="userName line-limit-length">
             {accountName}</span>
            </div>
            <div className="head-date">
               <Moment format="YYYY-MM-DD" date={currentTime} locale="CH"/>
            </div>  
        </div>
    )
}
const SalesStatistics=(props)=>{
    const {items}=props;
    return(
        <div className="SalesStatistics">
            <img className="fourPic" alt="" src={items.icon}/>
            <p>{items.name }</p>
            <div className="homePrice">￥{items.price}</div>
        </div>
    )
}
class  TotalNumberItem extends Component{
    totalFun(value){
        this.props.LinkTypeFun(value);
    }
    render(){
        const {items}= this.props;
        if(items.type !=='totalNuber'){
            return(
                <div className="TotalNumberItem" onClick={this.totalFun.bind(this,items.linkType)}>
                    <div className="TotalItem">
                        <div className="type-num">
                            {items.num}
                        </div>
                        <div className="type-name">
                                {items.name}
                        </div>
                        <div className="type-time">
                            {items.time? `(超过${items.time}h)` :''}
                        </div>
                    </div>
                    
                </div>
            )
        }else{
            return(
                <div className="totalNuber" onClick={this.totalFun.bind(this,items.linkType)}>
                <div className="type-num">
                        {items.num}
                </div>
                <div className="type-name">
                        {items.name}
                </div>
                </div>
            )
        }
    }
    
}
class HomePage extends Component{
    constructor(){
        super()
        this.state={
            selectedTab: 'HomePage',
            token: getSession('accountToken'),
            content: {
                accountName:'',
                currentTime:''
            },
            SalesArray:[],
            TotalArray:[]
            
        }
    }
    componentDidMount(){
        isTokenValid(this.props);
        let data={
            token : this.state.token
        }
        this.$apis.queryHomeData(data)
        .then(
            res=>{
                if(res.code === 1){
                    this.setState({
                        content : res.content 
                    })
                    let SalesData=[
                        {
                            name : '今日累计销售额',
                            props : 'salesToday',
                            icon: require('@/asstes/imgs/day.png')
                        },{
                            name : '当月累计销售额',
                            props : 'monthlySales',
                            icon: require('@/asstes/imgs/month.png')
                        },{
                            name : '年度累计销售额',
                            props : 'annualSales',
                            icon: require('@/asstes/imgs/year.png')
                        },{
                            name : '总销售额',
                            props : 'totalSales',
                            icon: require('@/asstes/imgs/all.png')
                        }
                    ]
                    let TotalData=[
                        {
                            name : '正常运行',
                            props : 'numberOfOnline',
                            type : 'onWorking',
                            time : '',
                            linkType: 'normal'
                        },{
                            name : '缺票设备',
                            props : 'missingTicketEquipment',
                            type : 'lessTiket',
                            time : '12',
                            linkType: 'lack'
                        },{
                            name : '无销量设备',
                            props : 'noSalesEquipment',
                            type : 'noSales',
                            time : '24',
                            linkType: 'noSale'
                        },{
                            name : '未开机设备',
                            props : 'nonBootDevice',
                            type : 'noBooting',
                            time : '24',
                            linkType: 'noOpen'
                        },{
                            name : '设备总数',
                            props : 'totalNumberOfDevices',
                            type : 'totalNuber',
                            linkType : 'all'
                        }
                    ]
                    SalesData.forEach((item)=>{
                        if(Object.keys(res.content).indexOf(item.props)){
                            item.price = res.content[item.props]
                        }
                    })   
                    TotalData.forEach((item)=>{
                        if(Object.keys(res.content).indexOf(item.props)){
                            item.num = res.content[item.props]
                        }
                    })
                    this.setState({
                        SalesArray : SalesData,
                        TotalArray : TotalData
                    })
                }
        })
    }
    // tabBar 路由跳转
    onBarFun(e){
        this.props.history.push({ pathname : `/${e}`})
    }
    //LinkFun
    LinkFun(value){
        this.props.history.push({ pathname : `/MyDevice`,state:{ 'menuType': value}})
    }
    render(){

        const {accountName,currentTime}=this.state.content;
        return(
            <div className="page">
                <div className="Mian">
                     <HeaderTitle accountName={accountName} currentTime={currentTime}/>
                    <div className="SalesBolck">
                     { this.state.SalesArray.map((item,index)=><SalesStatistics items={item} key={index}/>)}
                    </div> 
                    <div className="TotalBolck">
                       { this.state.TotalArray.map((item,index)=><TotalNumberItem LinkTypeFun={this.LinkFun.bind(this)}  items={item} key={index}/>)}
                    </div>
                </div>
                <div className="TabBar">
                    <TabBar  onBar = {this.onBarFun.bind(this)}  selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}
export default HomePage;