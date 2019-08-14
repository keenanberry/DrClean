import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header'; 
import UploadCard from './components/UploadCard';
import DownloadCard from './components/DownloadCard';
import RecommendationTable from './components/RecommendationTable';
//import store from './components/store';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        {/* <NewTable /> */}
        <RecommendationTable />
        {/* <UploadCard /> */}
        {/* <DownloadCard /> */}
      </div>
    ); 
  }
}

export default App

//const store = createStore(() => [], {}, applyMiddleware()); 

// class App extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <div className="App">
//           <Header/>
//           {/* <RecommendationTable /> */}
//           <UploadCard />
//           {/* <DownloadCard /> */}
//         </div>
//       </Provider>
//     ); 
//   }
// }

// export default App