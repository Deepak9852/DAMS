import React ,{ useState} from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import UserContextProvider from "../context/userContextProvider";
import { Footer } from "../Footer/footer";


export function Login() {
    const [loginInfo, setLoginInfo] = useState({
      email: "",
      password:"",
    });


    

    const navigate = useNavigate();    
  
    
  const handleChange = (e) =>{
    const {name, value} = e.target;
    const copyLoginInfo = {...loginInfo}
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo)
  }  
  
  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/login";
      let response = await fetch(url, {
        method: "POST",
        headers:{
          accept: "application/json",
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result)
      
      if(result.status === 'success'){
        localStorage.setItem('accessToken', result.accessToken);
        // console.log(localStorage.getItem("accessToken"));
        localStorage.setItem('loggedInUser', result.data[0].first_name);
        // alert("login Successfully completed")
        navigate('/')
      // console.log(jwtToken)
       
      }
      else{
        alert("Enter the valid credential")
      }
    } catch (error) {
      console.error("Login error: ", error);
      alert("An error occurred while trying to log you in. Please try again later.");
    }
  }

  return (
    <UserContextProvider>
    <Header/>
    <div className="loginBox">
        <div className="login">
            <h2>LogIn</h2>
            <div className="formBox">
                <form onSubmit={handleLogin}>
                    <div className="field"><input type="email" placeholder="Email" name="email" onChange={handleChange} required /></div>
                    <div className="field"><input type="password" placeholder="Password" name="password" onChange={handleChange} required /></div>
                    <div className="loginText"><p>don't have an account? <Link to="/register">SignUp</Link></p></div>
                    <div className="loginbtn"><button type="submit">Login</button></div>
                </form>
            </div>
            

        </div>
      </div>
      <Footer/>
    </UserContextProvider>
  )
}
