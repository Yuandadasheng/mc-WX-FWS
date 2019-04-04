import React ,{ Component} from 'react';
import { TabBar } from 'antd-mobile';
import './TabBar.scss'


const List=[
    {
        title : '首页',
        icon : require('@/asstes/imgs/sywxz.png'),
        selectedIcon : require('@/asstes/imgs/syxz.png'),
        selectedTab: 'HomePage'
    },
    {
        title : '交易查询',
        icon :  require('@/asstes/imgs/jywxz.png'),
        selectedIcon :  require('@/asstes/imgs/jyxz.png'),
        selectedTab: 'Transaction'
    },
    {
        title : '设备查询',
        icon : require('@/asstes/imgs/sbwxz.png'),
        selectedIcon : require('@/asstes/imgs/sbxz.png'),
        selectedTab: 'MyDevice'
    },
    {
        title : '我的商户',
        icon : require('@/asstes/imgs/wdshb.png'),
        selectedIcon : require('@/asstes/imgs/wdsh.png'),
        selectedTab: 'MyShopList'
    },
    {
        title : '个人中心',
        icon : require('@/asstes/imgs/grwxz.png'),
        selectedIcon : require('@/asstes/imgs/grxz.png'),
        selectedTab: 'UserCenter'
    }
]

class TabBarEl extends Component{
    constructor(props){
        super(props)
        this.state = {
            hidden: false,
        }
    }
    // 点击tabber 向父级传值
    clickFun(e){
        this.props.onBar(e)
    }
    render(){
        const ListArray = List; 
        return(
            <div className="tab-list">

                <TabBar
                 unselectedTintColor="#757576"
                 tintColor="#2A55F7"
                 barTintColor="white"
                 hidden={this.state.hidden}
                >
                { ListArray.map((items,index)=> 
                     <TabBar.Item
                        title={items.title}
                        key={index}
                        icon={{ uri: items.icon }}
                        selectedIcon={{ uri: items.selectedIcon }}
                        onPress={() => {
                            this.setState({
                            selectedTab: items.selectedTab,
                            })
                            this.clickFun(items.selectedTab)
                        }}
                        onClick={this.clickFun.bind(this)}
                        selected={this.props.selectedTab === items.selectedTab}>
                   
                    </TabBar.Item>
                    )}   
                </TabBar>    
            </div>
        )
    }
}
export default TabBarEl;