"use client";

import React, { useEffect, useState,useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
// import {axios} from "axios";

const ResetPassword = () => {
  
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user, setUser] = useState({
      email:"",
      password: "",
      confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const resetPassword = async () => {
      try {

        if(!(user.password === user.confirmPassword)){
            return;
        }
        setButtonDisabled(false);
        const res = await axios.post(`/api/users/resetPassword`, { email:user.email,password:user.password,confirmPassword:user.confirmPassword,token });
        console.log(res);
        
      } catch (err: any) {
        setError(err.response.data.message);
        console.log("error hai ye",err);
      }
    };

    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      setToken(urlToken || "");
      
    }, []);

    useEffect(() => {
        if (
          user.password.length > 0 &&
          user.confirmPassword.length > 0 &&
          user.email.length > 0 &&
          user.password === user.confirmPassword
        ) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
        
    }, [user])
    
   

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>{loading ? "Processing" : "Reset password"}</h1>
        <hr />

        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="confirmPassword"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          placeholder="Confirm Password"
        />

        <button
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            buttonDisabled ? "line-through" : ""
          } `}
          onClick={resetPassword}
          disabled={buttonDisabled}
        >
          Reset password
        </button>
        <Link href={`/login`}>Visit Login</Link>
        { (error.length > 0) && <p className="text-red-700">{error}</p>}
      </div>
    );
};

export default ResetPassword;
