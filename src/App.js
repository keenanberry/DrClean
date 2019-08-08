import React from 'react'
import Header from './components/Header'
//import Buttons from './components/Buttons'
//import TextFields from './components/TextFields'
import Upload from './components/Upload'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header title="Upload"/>
        {/* <Buttons text="Upload" />
        <TextFields /> */}
        <Upload />
      </div>
    ); 
  }
}

export default App
