"use client";

import React, { useState,useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    });

  const onLogin = async () => {

    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user); 
      console.log(response);
      router.push('/profile');
    } catch (err:any) {
      console.log("Login failed!!!",err);
      
    }finally{
      setLoading(false);
    }


  };


  useEffect(() => {

    if(user.email.length > 0 && user.password.length > 0){
      setbuttonDisabled(false);
    }else{
      setbuttonDisabled(true);
    }

  }, [user])
  



  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>{loading ? 'Processing' : "Login"}</h1>
        <hr />

        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
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

        <button
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'line-through' : ''}`}
          onClick={onLogin}
          disabled={buttonDisabled}
        >
          Login here
        </button>
        <Link href={`/signup`}>Visit Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
