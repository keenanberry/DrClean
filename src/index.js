import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'; 

function productsReducer(state = [], action) {
    return state;
}

function userReducer(state = '', { type, payload }) {
  switch (type) {
    case 'updateUser':
      return payload;
    default:
      return state;
  }
}

const allReducers = combineReducers({
  products: productsReducer,
  user: userReducer
}); 

const store = createStore(
    allReducers,
    {
      products: [{name: 'iphone'}],
      user: 'Michael'
    }, 
    window.devToolsExtension && window.devToolsExtension()); 

ReactDOM.render(<Provider store={store}><App /></Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
