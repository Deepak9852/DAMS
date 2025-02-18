import React from 'react'
import {Routes, Route} from "react-router";
import App from './component/app';
import { Login } from './component/Login/login';
import Register from './component/Login/register';
import Dashboard from './component/dashboard/dashboard';
import Data from './component/Data/data';

function Routing() {
  return (
    <div className='routes'>
      <Routes>
          <Route path="/"  element={<App/>}  />
          <Route path="/dashboard"  element={<Dashboard/>}  />
          <Route path="/data"  element={<Data/>}  />
          <Route path="/login"  element={<Login/>} />
          <Route path="/register"  element={<Register/>} />
      </Routes>
    </div>
  )
}

export default Routing;
