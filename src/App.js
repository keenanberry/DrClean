import React, { Component } from 'react'
import Header from './components/Header'
import UploadCard from './components/UploadCard'
import DownloadCard from './components/DownloadCard'
import SimpleTable from './components/RecommendationTable'

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <SimpleTable />
        {/* <UploadCard />
        <DownloadCard /> */}
      </div>
    ); 
  }
}

export default App