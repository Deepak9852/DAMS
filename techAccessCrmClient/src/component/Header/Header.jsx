import React, { useState, useEffect, useContext } from "react";
import "./header.css";
// import {Nav,Navbar,Container,NavDropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext.jsx";
import axios from "axios";


export function Header() {
  const [loggedInUser, SetLoggedInUser] = useState(null);

  const { setUser } = useContext(UserContext);
  setUser(loggedInUser);
  useEffect(() => {
    SetLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);


  const logout = async (e) => {
    e.preventDefault();
    
    if(window.confirm("Are you sure to logout ?")){
    try {
      const url = "http://localhost:8000/api/logout";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // Clear the user data from localStorage
        localStorage.removeItem("loggedInUser");
        SetLoggedInUser();
        // Optionally, clear the token
        // localStorage.removeItem('token');
      } else {
        alert("Logout failed, please try again.");
      }
    } catch (error) {
      console.error("Logout error: ", error);
      alert(
        "An error occurred while trying to logOut. Please try again later."
      );
    }
  }
  else{
    alert("Cancelled! No action taken.")
  }
  };

  const getCounsellorList = async (e) =>{
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    console.log(token);

    try {
      const url = "http://localhost:8000/api/counsellor";
      let counsellorResponse =  await fetch(url, {
        method : "GET",
        credentials: "include",
        headers : {
          "Content-Type" : "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      const data = await counsellorResponse.json();
      console.log(data)
      if (counsellorResponse.ok) {
        localStorage.setItem('token', data.token)
          console.log("User is authenticated:", data);
      } else {
          console.error("Auth error:", data.message);
      }

    } catch (error) {
      console.error("Role error: ", error);
      alert(
        "An error occurred while trying to fetch data. Please try again later."
      );
    }
  };


  // Create an Axios instance
  // const getCounsellorList = axios.create({
  //   baseURL: "http://localhost:8000/api/counsellor",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  
  // // Add a request interceptor to attach the token
  // getCounsellorList.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem("accessToken"); // Get the token
  //     if (token) {
  //       config.headers["Authorization"] = `Bearer ${token}`; // Attach token
  //     }
  //     return config;
  //   },
  //   (error) => Promise.reject(error)
  // );
  
  // // Add a response interceptor to handle errors globally
  // getCounsellorList.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response && error.response.status === 401) {
  //       console.error("Unauthorized! Logging out...");
  //       localStorage.removeItem("accessToken"); // Remove invalid token
  //       // window.location.href = "/login"; // Redirect to login page
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  

  

  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-lg sticky-top"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand">
              <img
                src="https://i.ibb.co/DfWVCj9F/final-Logo.png"
                alt="Logo"
                id="logo"
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={loggedInUser ?  "/dashboard" : "#"} >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={loggedInUser ?  "/data" : "#"}>
                    Data
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={getCounsellorList}>Counsellor</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link ">
                    {loggedInUser ? (
                      <button onClick={logout} id="logout">
                        {loggedInUser.toUpperCase()}{" "}
                        <i class="bi bi-box-arrow-right"></i>
                      </button>
                    ) : (
                      <Link to="/login" id="login">
                        <i class="bi bi-box-arrow-right"></i> Login
                      </Link>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
