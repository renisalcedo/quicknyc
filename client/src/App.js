import React, { Component } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';
import Map from './components/Map';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Map/>
        <TabBar/>
      </div>
    );
  }
}

export default App;
