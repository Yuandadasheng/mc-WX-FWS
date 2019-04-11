import React ,{ Component} from 'react';
import ReactDOM from 'react-dom';
import TabBar from '@/component/TabBar/TabBar';
import { getSession } from '@/utils/mUtils';
import {PullToRefresh, Picker, List ,Toast} from 'antd-mobile';
import Moment from 'react-moment';
import 'moment-timezone';
import './MyShopList.scss'

class  ListModule extends  Component{
    constructor(props){
        super(props)
        this.state={}
    }
    onClickFun(id){
       this.props.ClickFun(id)
    }
    render(){
        const { obj } = this.props;
        return(
            <div className="areList">
                <div className="areListItem" 
                        onClick={this.onClickFun.bind(this,obj.id)}>
                    <div className="areListItemLeft">
                        <div className="areaName">
                            {obj.merchantName}
                        </div>
                        <div  className="areaTime">
                            授权时间：<Moment format="YYYY-MM-DD" date={obj.createTime} locale="CH"/>
                        </div>
                    </div>
                    <div className="areListItemRight">
                        <span className=" realName">
                                {obj.realName}
                        </span>
                    <img  src={require("@/asstes/imgs/tel.png")} className="phone" alt=""
                        onClick={()=>{
                        window.location.href = 'tel://' + obj.phone;
                        }}/>
                        
                    </div>
                
                </div>
            </div>
        )
    }
    
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
    ClickLinkFun(id){
       this.props.clickEvent(id);
    }
    render() {
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
                    this.props.datas.map((item,index) => (
                    <div key={index} >
                        <ListModule
                        ClickFun={this.ClickLinkFun.bind(this) }
                        obj={item}
                         />
                    </div>
                    ))
                }
                <div style={{height:'1.5rem'}}></div>
            </PullToRefresh>
        </div>);
    }
} 

class Pickers extends Component{
    constructor(){
        super()
        this.state = {
            token: getSession('accountToken'),
            data: [],
            MerchantType : [],
            regionData: [],
            regionValue: [],
            TypeValue: [],
            visible: false,
        }
    }
    componentDidMount(){
        this.queryMerchantType();
        this.getMerchantAreasByFacilitator();
    }
    getMerchantAreasByFacilitator(){
        let data={
            token : this.state.token
         }
         this.$apis.getMerchantAreasByFacilitator(data)
            .then(
                res=>{
                    if(res.code === 1){

                        let regionData=this.IterateOver(res.content)
                        this.setState({
                            regionData
                        })
                    }
                }
            )
    }
    IterateOver(data){
        let childrenFirst={
            value : null,
            label :  '全部'
        }
        data.forEach(
            (item)=>{
                item.value = item.id;
                item.label = item.name;
                item.children = item.child;
                if(!item.id||item.id === 'undefined'){
                    item.value = null;
                }
                if(item.children.length > 0){
                    this.IterateOver(item.children)
                }
                item.children.unshift(childrenFirst)
                delete item.id;
                delete item.name;
                delete item.child;
        })
        return data;
    }
    queryMerchantType(){
        let data={
           token : this.state.token
        }
        this.$apis.queryMerchantType(data)
        .then(
            res =>{
                if(res.code === 1){
                    let Type = [];
                    res.content.forEach((item,index)=>{
                        Type[index]={
                            label : item.typeName,
                            value : item.typeId
                        }
                    })
                    this.setState({
                        MerchantType : Type
                    })
                }
            }
        )
    }
    regionOkValue(value){
        this.props.regionOk(value)
    }
    TypeValue(value){
        this.props.TypeOk(value)
    }
    render(){
        return(
            <div>
                <List style={{ backgroundColor: 'rgba(221, 227, 249,.2)' }} className="picker-list">
                 <Picker extra="请选择地区"
                   
                    data={this.state.regionData}
                    title="选择地区"
                    value={this.state.regionValue}
                    onOk={e =>{ this.setState({ regionValue: e });this.regionOkValue(e)}}
                    onDismiss={e => {this.setState({ regionValue: [] });this.regionOkValue([null])}}
                    >
                    <List.Item arrow="horizontal">地区</List.Item>
                </Picker>
                 <Picker
                    className="merchantData"
                    data={this.state.MerchantType}
                    title="商户类型"
                    extra="请选择商户类型"
                    value={this.state.TypeValue}
                    cols={1}
                    onDismiss={ v => {this.setState({ TypeValue:  null }); this.TypeValue([null])}}
                    onOk={v => {this.setState({ TypeValue: v }); this.TypeValue(v)}}
                    >
                    <List.Item arrow="horizontal">商户类型</List.Item>
                    </Picker>
                 </List>
            </div>
        )
    }
}

class MyShopList extends Component{
    constructor(){
        super()
        this.state={
            token: getSession('accountToken'),
            selectedTab: 'MyShopList',
            area : null,
            MerchantsType : null,

            datas:[],
            pageIndex:1,
            refreshing: true,
            isLoading: true,
        
        }
    }
    componentDidMount(){
        this.queryMyMerchant(true);
    }
    queryMyMerchant(ref=false){
        let that = this;
        let data={
            merchantType : this.state.MerchantsType,
            areaId :  this.state.area,
            pageNum: this.state.pageIndex-1,
            token : this.state.token
        }
       
        this.$apis.queryMyMerchant(data)
            .then(
                res =>{
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
    // tabBar 路由跳转
    onBarFun(e){
       
        this.props.history.push({ pathname : `/${e}`});
    }
    regionOkFun(value){
        let area  = null;
        if(value[2]){
            area = value[2]
        }else if(value[1]){
            area = value[1]
        }else{
            area = value[0]
        }
        this.setState({
            area,
            pageIndex:1,
            datas:[],
        },()=>{
            this.queryMyMerchant(true)
        })
    }
    TypeOkFun(value){  
       let MerchantsType = value[0];
       this.setState({
            MerchantsType,
            pageIndex:1,
            datas:[],
        },()=>{
            this.queryMyMerchant(true)
        })
    }
    HanldFun(val){
        this.setState({
            isLoading: true,
            pageIndex: val,
            // dataArr:[],
            // datas:[],
        },()=>{
            this.queryMyMerchant(false)
        })
    }
    clickEventFun(id){
        this.props.history.push({ pathname : `/MyShopInfo` ,state:{id: id}});
    }
    render(){
        return(
            <div>
                <Pickers
                    regionOk={this.regionOkFun.bind(this)}
                    TypeOk={this.TypeOkFun.bind(this)}/>
                <div>
                {
                    this.state.datas ?  <ListViewEl  
                     datas={this.state.datas}
                     pageIndex={this.state.pageIndex}
                  
                     refreshing={this.state.refreshing}
                     isLoading={this.state.isLoading}
                     onHanldFun = {this.HanldFun.bind(this)}
                     clickEvent = {this.clickEventFun.bind(this)}
                     /> :null
                }
                </div>    
                <div className="TabBar">
                    <TabBar onBar = {this.onBarFun.bind(this)} selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}
export default MyShopList;