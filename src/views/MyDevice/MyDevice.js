import React ,{ Component} from 'react';
import { getSession } from '@/utils/mUtils'
import TabBar from '@/component/TabBar/TabBar'
import { Doughnut } from 'react-chartjs-2'

import './MyDevice.scss'


class TabMenuList extends Component{
    componentDidMount(){

      
    }
    onMenu(value){
        this.props.onMenuOther(value)
    }
    // onMenuOther
    render(){
        const {items, tabMenuType} =this.props

        const chartOptions={
            title: {
                display: false,

            },
            tooltips: {
                // Disable the on-canvas tooltip
                enabled: false,
            },
            cutoutPercentage: 70
        }
        const chartData={
             // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
             datasets: [{
                 // data: [12, 19, 3,8], //
                 data:[12, 19, 3,8],
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
class MyDevice extends Component{
    constructor(){
        super()
        this.state={
            token: getSession('accountToken'),
            selectedTab: 'MyDevice',
            TabMenuContent:null,
            tabMenuType: 'all'
        }
    }
    componentDidMount(){
        this.queryTerminalStatusRes();
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
    menuOther(val){
        console.log(val)
        this.setState({
            tabMenuType: val
        })
    }
    render(){
        const { TabMenuContent } =this.state
        return(
            <div className="MyDevice">
                <div className="tab-menu">
                    {TabMenuContent?
                    TabMenuContent.map((item,index)=><TabMenuList 
                    items={item}
                    tabMenuType= { this.state.tabMenuType}
                    onMenuOther = {this.menuOther.bind(this)}
                    key={index}/>)
                    :null}
                </div>    
                <div className="TabBar">
                    <TabBar onBar = {this.onBarFun.bind(this)} selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}
export default MyDevice;