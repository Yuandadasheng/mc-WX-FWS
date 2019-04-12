import React ,{ Component} from 'react';
import ReactDOM from 'react-dom';
import TabBar from '@/component/TabBar/TabBar'
import { getSession ,isTokenValid} from '@/utils/mUtils'
import { Button ,DatePicker,Toast,PullToRefresh} from 'antd-mobile';
import Moment from 'react-moment';
import 'moment-timezone';
import './Transaction.scss'

const timeTypeData=[
    {
        type: 'DAY',
        name : '日'
    },
    {
        type: 'MONTH',
        name : '月'
    },
    {
        type: 'YEAR',
        name : '年'
    },
    {
        type: 'ALL',
        name : '总'
    }
]

const TransactionItem = (props)=>{
    const { obj } = props;
    return(
        <div className="TransactionItem">
            <div className="transaction-item">
                <div className="transaction-header">
                    <span className="date">
                        日期：{obj.showDate}
                    </span>
                </div>
                <div className="body">
                    <div className="title">
                        销售金额
                    </div>
                    <div className="sum">
                        ￥  {obj.oderSuccessPrice}
                    </div>
                    <div className="quantity">
                        <div className="sales item">
                           <span>
                                销售张数:
                                <span className="num">{obj.orderSellNum}</span>
                           </span>
                        </div>
                        <div className="deal item">
                            <span>
                                交易笔数:
                                <span className="num">{obj.orderNum}</span>
                           </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const Operation =(props)=>{
    const { obj } = props;
    return(
        <div className="Operation">
            <div className="item">
                <div className="designation">
                    <span>
                        {obj.name}(￥{obj.lotteryPrice}元)
                    </span>
                    <span className="time">
                        {obj.createTime ? <Moment format="YYYY-MM-DD h:mm:ss" date={obj.createTime} locale="CH"/>: ''}
                    </span>
                </div>
                <div className="price">
                ￥ {obj.oderSuccessPrice}
                </div>
            </div>
        </div>
    )
}
class ListViewEl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex:1,
            isLoading: true,
          
            typeValue: this.props.typeValue,
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        }; 
    }
    componentWillReceiveProps(nextProps){
       
        if (nextProps.datas!== this.props.datas) {
            this.setState({
                pageIndex: nextProps.pageIndex,
                refreshing: nextProps.refreshing,
                isLoading:  nextProps.isLoading,
                //保存数据进state
               
                data: nextProps.datas
            });
        }
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
          height: hei,
        }), 0);  
    }
    onRefresh(){
        this.setState({ 
            refreshing: true,
            pageIndex : this.state.pageIndex+1
         });
        setTimeout(() => {
            this.setState({ refreshing: false });
          }, 1000);
 
        this.props.onHanldFun(this.state.pageIndex)
    }
    // ClickLinkFun(id){
    //    this.props.clickEvent(id);
    // }
    render() {
        const { tradeCutType ,datas } = this.props;
      
        return (<div>
           <PullToRefresh
                damping={60}
                ref={el => this.ptr = el}
                style={{
                height: this.state.height,
                overflow: 'auto',
                }}
            
                direction={ 'up' }
                refreshing={this.state.refreshing} //是否显示刷新状态
                onRefresh={this.onRefresh.bind(this)}
            >
             {
                 tradeCutType === 'tradeStatistics' ?
                 (
                    datas.map((item,index) => (
                        <div key={index} >
                            <TransactionItem  obj={item} />
                        </div>
                        ))
                 )
                 
                    
                :
                  (datas.map((item,index) => (
                    <div key={index} >
                        <Operation obj={item}/>
                    </div>
                    ))
                    )
             }
                
                <div style={{height:'1.5rem'}}></div>
            </PullToRefresh>
        </div>);
    }
} 
class MerchantItemList extends Component{
    MerchantItemClick(value){
        this.props.MerchantFun(value)
    }
    render(){
        const {items} = this.props
        return(
            <div className="MerchantItemList" onClick={this.MerchantItemClick.bind(this,items)}>
                <div className="name">
                 {items.merchantName}
                </div>
                <div className="roleName ">
                 {items.realName}
                </div>
                <div className="address">
                 {items.address}
                </div>
                
            </div>
        )
    }
    
}
class MerchantList extends Component{
    constructor(props){
        super(props)
        this.state={
            value:'' ,
            content : null
        }
    }
    componentDidMount(){
        this.searchMerchant(this.state.value);
    }
    searchMerchant(desc){
        let data={
            token : this.props.token,
            desc : desc
        }
        this.$apis.searchMerchant(data)
            .then(
                (res)=>{
                    if(res.code === 1){
                        res.content.forEach(item => {
                           if(!item.merchantAccountId){
                            item.merchantAccountId = null
                           }
                       });
                       this.setState({
                           content: res.content
                       })
                    }
                }
            )
    }
    CloseMerchantList(){
        this.props.CloseMerchant()
    }
    onChangeFun(event){
        this.setState({
            value: event.target.value,
        });
        this.searchMerchant(event.target.value);
    }
    render(){
        return(
            <div className="MerchantList">
                <div className="search-form">
                    <div className="search">
                        <input type="text" value={this.state.value}
                         onChange={this.onChangeFun.bind(this)}
                          placeholder="请输入"/>
                    </div>
                    <div className="search-but" onClick={this.CloseMerchantList.bind(this)}>
                        取消
                    </div>
                </div>
                <div className="search-body">
                    {
                        this.state.content ? 
                        this.state.content.map((item,index)=>
                        <MerchantItemList 
                            MerchantFun={(value)=>this.props.MerchantClickFun(value)}
                            items={item} key={index}/>)
                        :null
                    }
                </div>
               
            </div>
        )
    }
}
class Transaction extends Component{
    constructor(){
        super()
        this.state={
            token : getSession('accountToken'),
            selectedTab: 'Transaction',
            tradeCutType: 'tradeStatistics',
            duration: 'DAY',
            startingTime: null,
            endTime:null,
            dateTitle :"日期",
            dateMode : 'date',
            dateformat : "YYYY-MM-DD",

            merchantsListModel : false,
            merchantId:null,
            merchantName : null,
            pageIndex :1,
            datas:[],
            refreshing: true,
            isLoading: true,
        }
    }
    componentDidMount(){
        isTokenValid(this.props)
        this.queryOrderStatistics(true)
    }
    // tabBar 路由跳转
    onBarFun(e){
        this.props.history.push({ pathname : `/${e}`})
    }
    // 切换交易类型
    DealCutBut(value){
        this.setState({
            tradeCutType: value,
            startingTime: null,
            endTime:null,
            merchantId:null,
            merchantName : '--默认全部--',
            pageIndex: 1,

        },()=>{
          
            value === 'tradeStatistics' ?  this.queryOrderStatistics(true) : this.queryOrderStream(true);
        })
    }
    //切换时间
    DurationCutBut(value){
        let dateMode= value=== 'DAY'?'date': (value=== 'MONTH'? 'month' :'year')
        let dateformat= value=== 'DAY'? "YYYY-MM-DD" : (value=== 'MONTH' ? "YYYY-MM" :"YYYY")
        let dateTitle = value=== 'DAY'? "日期" : (value=== 'MONTH' ? "月份" :value=== 'YEAR' ? "年份":'时间')
        this.setState({
            duration: value,
            dateMode,
            dateformat,
            dateTitle,
            startingTime: null,
            endTime:null,
            merchantId:null,
            merchantName : null,
            pageIndex : 1
        },
        ()=>{
            this.queryOrderStatistics(true);
        //    this.state.duration === 'tradeStatistics' ?  this.queryOrderStatistics() : this.queryOrderStream();
        })
    }
    //点击选择商户弹出框
    MerchantsClick(){
        this.setState({
            merchantsListModel : true
        })
    }
    //关闭选择商户
    CloseMerchantFun(){
        this.setState({
            merchantsListModel : false,
            merchantId: null,
            merchantName: '全部'
        },()=>{
            this.state.tradeCutType === 'tradeStatistics' ?  this.queryOrderStatistics(true) : this.queryOrderStream(true);
        })
    }
    //选中商户
    MerchantItemFun(value){
      
        this.setState({
            merchantsListModel : false,
            merchantId: value.merchantAccountId,
            merchantName: value.merchantName

        },()=>{
            this.state.tradeCutType === 'tradeStatistics' ?  this.queryOrderStatistics(true) : this.queryOrderStream(true);
        })
    }
    //选择起始时间
    startingTimeFun(value){
        
        this.setState({
            startingTime: value 
        },()=>{
            this.state.tradeCutType === 'tradeStatistics' ?  this.queryOrderStatistics(true) : this.queryOrderStream(true);
        });
        
    }
    //选择结束时间
    endTimeFun(value){
       
        this.setState({
            endTime: value 
        },()=>{
            this.state.tradeCutType === 'tradeStatistics' ?  this.queryOrderStatistics(true) : this.queryOrderStream(true);
        });
        
    }
    //上拉加载数据
    HanldFun(val){
        this.setState({
            isLoading: true,
            pageIndex: val,
            // dataArr:[],
            // datas:[],
        },()=>{
           
            this.state.tradeCutType === 'tradeStatistics' ?  this.queryOrderStatistics(false) : this.queryOrderStream(false);
        })
    }
    // 交易统计
    queryOrderStatistics(ref=false){
        let that = this;
        let data={
            queryType : this.state.duration,
            merchantId: this.state.merchantId,
            startTime : this.state.startingTime ? this.$moment(this.state.startingTime).format(this.state.dateformat) :null,
            endTime : this.state.endTime ? this.$moment(this.state.endTime).format(this.state.dateformat) :null,
            pageNum : this.state.pageIndex-1,
            token : this.state.token
        }
       
        this.$apis.queryOrderStatistics(data)
            .then(
                res=>{
                    if(res.code === 1){
                       
                        const lg = res.content.length;
                        if(lg<=0){
                            Toast.info('没有数据了~',1);
                            return false;
                        }
                      
                        let m=that.state.datas;
                        for (let i = 0; i < lg; i++) {
                            //每一次读取的数据都进行保存一次
                                m.push(res.content[i])
                        }
                        if(ref){
                            //这里表示刷新使用
                            that.setState({
                                datas:res.content,
                                pageIndex:that.state.pageIndex,
                                refreshing: false,
                                isLoading: false,
        
                            });
                        }else{
                            //这里表示上拉加载更多                    
                            that.setState({
                                datas:m,
                                pageIndex:that.state.pageIndex,
                                refreshing: false,
                                isLoading: false,
                            });
                        }
                    }
                }
            )
    }
    //交易流水
    queryOrderStream(ref=false){
        let that = this;
        let data={
            merchantId: this.state.merchantId,
            startTime : this.state.startingTime ? this.$moment(this.state.startingTime).format(this.state.dateformat) :null,
            endTime : this.state.endTime ? this.$moment(this.state.endTime).format(this.state.dateformat) :null,
            pageNum : this.state.pageIndex-1,
            token : this.state.token
        }
       
      
        this.$apis.queryOrderStream(data)
            .then(
                res=>{
                    if(res.code === 1){
                        
                        const lg = res.content.length;
                        if(lg<=0){
                            Toast.info('没有数据了~',1);
                            return false;
                        }
                      
                        let m=that.state.datas;
                        for (let i = 0; i < lg; i++) {
                            //每一次读取的数据都进行保存一次
                                m.push(res.content[i])
                        }
                        if(ref){
                            //这里表示刷新使用
                            that.setState({
                                datas:res.content,
                                pageIndex:that.state.pageIndex,
                                refreshing: false,
                                isLoading: false,
        
                            });
                        }else{
                            //这里表示上拉加载更多                    
                            that.setState({
                                datas:m,
                                pageIndex:that.state.pageIndex,
                                refreshing: false,
                                isLoading: false,
                            });
                        }
                    }
                }
            )
    }
    render(){
        return(
            <div>
                <div className="dealType">
                    <div className="dealTypeBut">
                        <div className="tradeStatistics">
                            <Button 
                                className={[
                                    this.state.tradeCutType === 'tradeStatistics'?'selectBut' : ''
                                    ,"dealCutBut"].join(" ")}
                                onClick={this.DealCutBut.bind(this,'tradeStatistics')}
                            >交易统计</Button>
                        </div>
                        <div className="operation">
                            <Button 
                                 className={[
                                    this.state.tradeCutType === 'operation'?'selectBut' : ''
                                    ,"dealCutBut"].join(" ")}
                                onClick={this.DealCutBut.bind(this,'operation')}
                            >交易流水</Button>   
                        </div>
                    </div>
                    {
                        this.state.tradeCutType === 'tradeStatistics'?
                        <div className="duration">
                            <div className="durationItem">
                               { timeTypeData.map(
                                   (item,index)=> 
                                   (  <span 
                                            // className="items"
                                            className={[this.state.duration === item.type ? 'statusType':'' ,'items'].join(' ')}
                                            onClick={this.DurationCutBut.bind(this,item.type)}
                                             key={index}>
                                            {item.name}
                                    </span> )
                                )}
                              
                            </div>    
                        </div>
                        : null
                    }
                   
                    <div className="timing">
                        <div className="startTime timing-items">
                        <DatePicker
                            mode={this.state.dateMode}
                            title="起始时间"
                            extra="Optional"
                            onDismiss={ () =>{this.startingTimeFun(null)}}
                            maxDate={this.state.endTime}
                            value={this.state.startingTime}
                            onOk={date => {this.startingTimeFun(date)}}
                            >
                            <div className="timing-items-1">起始{this.state.dateTitle}:
                             {this.state.startingTime  ? <span>
                                 <Moment format={this.state.dateformat} date={this.state.startingTime} locale="CH"/></span> : <span>-- 默认不选 --</span>}
                              <img alt=""
                              style={{
                                  'width' : '0.4rem',
                                  'height' : '0.224rem'
                              }} src={require("@/asstes/imgs/xia.png")}/>
                             </div>
                         </DatePicker>
                            
                        </div>
                        <div className="endTime timing-items">
                            <DatePicker
                                mode={this.state.dateMode}
                                title="结束时间"
                                extra="Optional"
                                minDate={this.state.startingTime}
                                value={this.state.endTime}
                                onDismiss={ () =>{this.endTimeFun(null)}}
                                onOk={date => {this.endTimeFun(date)}}
                                >
                                <div className="timing-items-1">结束{this.state.dateTitle}:
                                {this.state.endTime ? <span><Moment format={this.state.dateformat} date={this.state.endTime} locale="CH"/></span> : <span>-- 默认不选 --</span>}
                                <img alt=""
                                style={{
                                    'width' : '0.4rem',
                                    'height' : '0.224rem'
                                }} src={require("@/asstes/imgs/xia.png")}/>
                                </div>
                            </DatePicker>   
                            
                        </div>
                    </div>
                    <div 
                        className="MerchantsChoose"
                        onClick={this.MerchantsClick.bind(this)}>
                        <span className="title">
                            商户:
                        </span> 
                        <span className="title-name">
                           {
                               this.state.merchantName ?<span>{this.state.merchantName}</span> :<span>--默认全部--</span>
                           } 
                        </span> 
                        <span className="title-img">
                            <img alt=""
                                style={{
                                    'width' : '0.4rem',
                                    'height' : '0.224rem'
                                }} src={require("@/asstes/imgs/xia.png")}/>
                                
                        </span>     
                    </div>
                </div>
                <div  className={[ this.state.tradeCutType === 'tradeStatistics'?'tradeStatistics-style' : 'operation-style'  ,"mianBody"].join(" ")}>
                    {
                        this.state.datas ?  <ListViewEl  
                        datas={this.state.datas}
                        pageIndex={this.state.pageIndex}
                        refreshing={this.state.refreshing}
                        isLoading={this.state.isLoading}
                        onHanldFun = {this.HanldFun.bind(this)}
                        tradeCutType = {this.state.tradeCutType}
                        //  clickEvent = {this.clickEventFun.bind(this)}
                        /> :null
                    }
                     
                </div>
                <div className="TabBar">
                    <TabBar onBar = {this.onBarFun.bind(this)} selectedTab={this.state.selectedTab} />
                </div>
                 {
                   this.state.merchantsListModel ? <MerchantList 
                            MerchantClickFun = {this.MerchantItemFun.bind(this)}
                            CloseMerchant = {this.CloseMerchantFun.bind(this)}
                            token={this.state.token}/> : null
                 }
            </div>
        )
    }
}
export default Transaction;