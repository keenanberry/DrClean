import React, { Component } from 'react'
import Header from './components/Header'
import PageButton from './components/PageButton'
import TextFields from './components/TextField'
//import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Header title="Upload"/>
        <PageButton text="Upload" />
        <TextFields />
      </div>
    ); 
  }
}

export default App