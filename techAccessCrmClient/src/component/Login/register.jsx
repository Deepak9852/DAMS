import React from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserContextProvider from "../context/userContextProvider";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/footer";

function Register() {
  const [signupInfo, setSignupInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password:'',
    role: ''
  });

const navigate = useNavigate();
  
const handleChange = (e) =>{
  const {name, value} = e.target;
  console.log(name, value)
  const copySignupInfo = {...signupInfo}
  copySignupInfo[name] = value;
  setSignupInfo(copySignupInfo)
}  

const handleSignup = async(e) =>{
  e.preventDefault();
  try {
    const url = "http://localhost:8000/api/register";
    const response = await fetch(url, {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',

      },
      body:JSON.stringify(signupInfo)
    });
    const result = await response.json();
    console.log(result);
    console.log(result.status);
    if(result.status === 'success'){
      alert("Registration Successfully completed")
      navigate('/login');
    }
    else{
      alert("Email id already registered")
    }
  } catch (error) {
    console.error("Register error: ", error);
      alert("An error occurred while trying to Register. Please try again later.");
  }
}

// const aftersubmit = () =>{
  
//   // window.location = "/login"
// }
  return (

    <UserContextProvider>
      <Header/>
      <div className="registrationBox">
        <div className="registration">
            <h2>Sign Up</h2>
            <div className="formBox">
                <form onSubmit={handleSignup}>
                    <div className="field"><input type="text" placeholder="First Name" name="first_name" value={signupInfo.first_name} onChange={handleChange} required /></div>
                    <div className="field"><input type="text" placeholder="Last Name" name="last_name" value={signupInfo.last_name} onChange={handleChange} required/></div>
                    <div className="field"><input type="email" placeholder="Email" name="email" value={signupInfo.email} onChange={handleChange} required/></div>
                    <div className="field"><input type="password" placeholder="Password"  name="password"  value={signupInfo.password} onChange={handleChange} required/></div>
                    <div className="field"><input type="text" placeholder="Role" name="role" value={signupInfo.role} onChange={handleChange} required/></div>
                    <div className="loginText"><p>Already have an account? <Link to="/login">Login</Link></p></div>
                    <div className="signUp"><button type="submit" >SignUp</button></div>
                </form>
            </div>
            

        </div>
      </div>
      <Footer/>
    </UserContextProvider>
  );
}

export default Register;
