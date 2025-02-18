import React  from 'react'
import { Header } from '../Header/Header'
import { DataDisplay } from '../DataDisplay/dataDisplay';
import { Footer } from '../Footer/footer';
import UserContextProvider from '../context/userContextProvider';

function Dashboard() {
  return (
    <UserContextProvider>
      <Header/>
      <DataDisplay/>
      <Footer/>
    </UserContextProvider>
  )
}

export default Dashboard;
