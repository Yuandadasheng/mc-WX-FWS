import React ,{ Component} from 'react';
import ReactDOM from 'react-dom';
import { getSession ,isTokenValid } from '@/utils/mUtils'
import TabBar from '@/component/TabBar/TabBar'
import { Doughnut } from 'react-chartjs-2'
import { PullToRefresh, Toast} from 'antd-mobile';

import './MyDevice.scss'


class TabMenuList extends Component{
    onMenu(value){
        this.props.onMenuOther(value)
    }
    render(){
        const {items, tabMenuType ,datas} =this.props
        
        const chartOptions={
            title: {
                display: false,

            },
            tooltips: {
                enabled: false,
            },
            cutoutPercentage: 70
        }
        const chartData={
             datasets: [{
               
                 data:datas,
                 backgroundColor: [
                     '#FF6982',
                     '#D9D9D9',
                     '#6F8EFF',
                     '#FFDD69'
                 ],
                 borderColor: [
                     '#FF6982',
                     '#D9D9D9',
                     '#6F8EFF',
                     '#FFDD69'
                 ]
             }]
         }
        if(items.type !== 'all'){
            return(
                <div className="menu-item menu-item-other" onClick={this.onMenu.bind(this,items.type)}>
                    <div className={[  "menu-item-block",tabMenuType === items.type?'clickStyle':''].join(' ')}>
                        <div className={[items.type,"terminal-num"].join(' ')}>
                           {items.terminalNum}
                        </div>
                        <div className="type-desc">
                            <span>
                                 {items.typeDesc}
                            </span>
                            <span>
                                {items.type !=='normal' ? 
                                `(超过${items.type !=='lack' ? '24' : '12' }h)`
                                :null}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="menu-item    menu-item-all" onClick={this.onMenu.bind(this,items.type)}>
                    <Doughnut height={350} width={350} className="menu-canvas" data={chartData} options={chartOptions} />
                    <div className="donut-inner">
                        <span className="all-num">
                            {items.terminalNum}
                        </span>
                        <span className="all-desc"> 
                             {items.typeDesc} 
                        </span>
                    </div>    
                </div>
            )
        }
        
    }
}   
const ListObj = (props) =>{
    const {obj,typeValue} = props
    // if(!objLength){
    //     console.log(1)
    // }
    return(
        <div 
            className="rowItem"
                style={{
                    backgroundColor: 'white',
                    height:'3.28rem',
                    borderBottom: '1px solid #eee'
                }}
                onClick={()=>{
                window.location.href = 'tel://' + obj.phone;
                }}
        >
        
            <div className="device-wrapper">
                <div className="device">
                    <span className="deviceId">
                            设备编号: {obj.no}
                    </span>

                    <span className={["device-status",`${ typeValue }-txt` , `${ obj.type === '在线' ? 'online-txt' :''}`].join(" ")}>
                            {obj.type}
                    </span>

                </div>
                <div className="tickets">
                    <span>
                        设备余票：{obj.terminalLotteryNum}张
                    </span>
                </div>
                <div  className="shop-infor">
                        <span  className="which-shop">
                                所属商户：{ obj.name}
                        </span>

                </div>
                <div>
                    <span   className="shop-address">
                    <img src={require('@/asstes/imgs/addrsh.png')} alt="" /> 地址：{obj.address}
                    </span>
                </div>

            </div>
        
        </div>
    )
}   
class ListViewEl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex:1,
            isLoading: true,
            dataArr:[],//关键代码
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
                dataArr: nextProps.dataArr,
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
                {this.state.data.map((i,index) => (
                <div key={index} >
                    <ListObj obj={i}  typeValue={this.props.typeValue}/>
                </div>
                ))}
                <div style={{height:'1.5rem'}}></div>
            </PullToRefresh>
            {/* <div style={{height:'1.5rem'}}></div> */}
        </div>);
    }
}              
class MyDevice extends Component{
    constructor(props){
        super(props)
        let menuType;
        if(this.props.location.state){
              menuType  = this.props.location.state.menuType;
        }
        let  tabMenuType = menuType ? menuType :'all';
        
        this.state={
            token: getSession('accountToken'),
            selectedTab: 'MyDevice',
            TabMenuContent:null,
            tabMenuType,

            datas:[],
            pageIndex:1,
            refreshing: true,
            isLoading: true,
            dataArr:[],//关键代码
        }
    }
    componentDidMount(){
        isTokenValid(this.props);
        this.queryTerminalStatusRes();
        this.genData(true)
    }
    // tabBar 路由跳转
    onBarFun(e){
        this.props.history.push({ pathname : `/${e}`})
    }
    // 设备状态与数量查询
    queryTerminalStatusRes(){
        let data={
            token : this.state.token
        }
        this.$apis.queryTerminalStatusRes(data)
            .then(
                res=>{
                    if(res.code === 1){
                        this.setState({
                            TabMenuContent : res.content
                        })
                    }
                }
            )
    }
    genData(ref=false) {
    
        //获取数据
        let that=this;
        let params={
                  token : this.state.token,
                  pageNum: this.state.pageIndex-1,
                  type: this.state.tabMenuType
              }
          this.$apis.queryTerminalsStatusRes(params)
          .then((res)=>{

            if(parseInt(res.code)===1){
                const lg = res.content.length;
                if(lg<=0){
                    Toast.info('没有数据了~',1);
                    return false;
                }
                let dataArr = that.state.dataArr;//关键代码
                let m=that.state.datas;
                for (let i = 0; i < lg; i++) {
                    //每一次读取的数据都进行保存一次
                    if(dataArr.indexOf(`${that.state.tabMenuType} - ${(that.state.pageIndex * lg) + i}`)){
                        dataArr.push(`${that.state.tabMenuType} - ${(that.state.pageIndex * lg) + i}`);
                        m.push(res.content[i])
                    }
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
                    that.rData = { ...that.rData, ...dataArr };
                  
                    that.setState({
                        datas:m,
                        pageIndex:that.state.pageIndex,

                        refreshing: false,
                        isLoading: false,
                    });
                }
            }else {
                Toast.info(res.msg,1);
            }
        });
    }
    menuOther(val){
        this.setState({
            tabMenuType: val,
            pageIndex:1,
            dataArr:[],
            datas:[],
        },()=>{
            this.genData(true)
        })
        
    }
    HanldFun(val){
    
       
        this.setState({
            isLoading: true,
            pageIndex: val,
            // dataArr:[],
            // datas:[],
        },()=>{
            this.genData(false)
        })
    }
    render(){
        const { TabMenuContent } =this.state;
        let data = [];
        if(TabMenuContent)(
            TabMenuContent.forEach((item)=>
            { 
                if(item.type !== 'all'){
                    data.push(item.terminalNum)
                
                }
            })
        )
       
        return(
            <div className="MyDevice">
                <div className="tab-menu">
                    {TabMenuContent?
                    TabMenuContent.map((item,index)=>{

                     return(<TabMenuList 
                        items={item}
                        datas= {data}
                        tabMenuType= { this.state.tabMenuType}
                        onMenuOther = {this.menuOther.bind(this)}
              
                        key={index}/>)
                    })
                    :null}
                </div>    
                <div className="listViewEl">
                    <ListViewEl  
                         datas={this.state.datas}
                         pageIndex={this.state.pageIndex}
                         typeValue= { this.state.tabMenuType}
                         refreshing={this.state.refreshing}
                         isLoading={this.state.isLoading}
                         dataArr={this.state.dataArr}
                         onHanldFun = {this.HanldFun.bind(this)}
                    />
                </div>
                <div className={["TabBar",getSession('specification')].join(' ')}>
                    <TabBar onBar = {this.onBarFun.bind(this)} selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}
export default MyDevice;