import React ,{ Component} from 'react';
import { PullToRefresh} from 'antd-mobile';
import ReactDOM from 'react-dom';

class ListViewEl extends Component {
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
                    {/* <ListObj obj={i}  typeValue={this.state.typeValue}/> */}
                </div>
                ))}
            </PullToRefresh>
        </div>);
    }
} 

export default ListViewEl;