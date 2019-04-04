import React, {Component} from 'react';
import './PlaceHolder.css'

class PlaceHolder extends Component{
    render(){
        const { className ,...restProps } = this.props
        return(
            <div className={`${className} placeholder`} {...restProps}>Block</div>
        )
    }
}
export default PlaceHolder;
// const PlaceHolder = ({ className = '', ...restProps }) => (
//     <div className={`${className} placeholder`} {...restProps}>Block</div>
//   );
  