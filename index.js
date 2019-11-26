import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import {createStore,applyMiddleware} from 'redux';
import Home from './Home';
import axios from 'axios';
let iniState = {
  data : []
}
let rootReducer = (state=iniState,action)=>{
switch(action.type){
  case "GET_DATA":
  console.log('The meta data is ',action);
return {
  ...state,
  data : action.payload
}
}
return state;
}
let store = createStore(rootReducer,applyMiddleware(thunk));

//middleware start

let get_new_data= (newData)=>{
  console.log('Inside action helper method ',newData);
return {
  type : 'GET_DATA',
  payload : newData
}
}

let actionGetData = ()=>{

return (dispatch)=>{
axios.get("https://jsonplaceholder.typicode.com/users")
.then((resUsers)=>{
  console.log('The list of users api ==> ',resUsers.data)
dispatch(get_new_data(resUsers.data));
})
.catch((err)=>{
  console.log('The main error is () ',err);
})
}
}
//middleware end

store.dispatch(actionGetData());

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
}

render(<Provider store={store}><Home/></Provider>, document.getElementById('root'));
