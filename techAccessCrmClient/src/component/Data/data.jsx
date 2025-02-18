import React from 'react'
import UserContextProvider from '../context/userContextProvider';
import "./data.css"
import { Header } from '../Header/Header';
import { Footer } from '../Footer/footer';

function Data() {
  return (
    <UserContextProvider>
      <Header/>
      <div className='outerBox'>
        data component
      </div>
      <Footer/>
    </UserContextProvider>
  )
}

export default Data;
