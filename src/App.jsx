import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './shared/Header';
import { useState } from 'react';
import { useLazySendOTPQuery } from './services/jsonApi';

function App() {
  let [mail,setmail]=useState('')
  const [send]=useLazySendOTPQuery()
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      {/* <input type="text" name="" id="" onKeyUp={(e)=>{setmail(e.target.value)}} />
      <button className='btn-primary' onClick={()=>{send(mail)}}>GET OTP</button> */}
    </div>
  );
}

export default App;
