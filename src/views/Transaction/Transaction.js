import React ,{ Component} from 'react';
import TabBar from '@/component/TabBar/TabBar'
import './Transaction.scss'
class Transaction extends Component{
    constructor(){
        super()
        this.state={
            selectedTab: 'Transaction',
        }
    }
    // tabBar 路由跳转
    onBarFun(e){
        this.props.history.push({ pathname : `/${e}`})
    }
    render(){
        return(
            <div>
                <div className="TabBar">
                    <TabBar onBar = {this.onBarFun.bind(this)} selectedTab={this.state.selectedTab} />
                </div>
            </div>
        )
    }
}
export default Transaction;