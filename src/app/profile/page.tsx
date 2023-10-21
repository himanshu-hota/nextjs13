"use client"

import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";



const ProfilePage = () => {

  const router = useRouter();

  const LogoutHandler = async () => {
    try {
      const response = await axios.get("/api/users/logout");  
      console.log(response);
      router.push('/login');
    } catch (err:any) {
      console.log(err.message);
    }
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={LogoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
