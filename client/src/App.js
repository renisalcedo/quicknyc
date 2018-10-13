import React, { Component } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
//import Map from './components/Map';
import Address from './components/Address';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Address/>
        <TabBar/>

      </div>
    );
  }
}

export default App;
