import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App">
       {this.props.children||'空白'}
      </div>
    );
  }
}

export default App;
