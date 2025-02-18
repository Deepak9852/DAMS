import React  from "react";
import {Header} from "./Header/Header.jsx";
import { Footer } from "./Footer/footer.jsx";
import UserContextProvider from "./context/userContextProvider.jsx";
import Home from "./Home/home.jsx"

function App() {
  
    return(
        
        <UserContextProvider>
        <Header/>
        <Home/>
        <Footer/>
        </UserContextProvider>
       
    )
}
export default App;