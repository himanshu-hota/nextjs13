"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const ResetPasswordRequest = () => {
  const [user, setUser] = useState({email: ""});

  const router = useRouter();
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetPasswordRequest", user);
      setbuttonDisabled(true);
      const data = response.data;
      if(data.success){
        setUser({ email: "" });
        setEmailSent(true);
        setError(false);
      }
      
      
    } catch (err: any) {
      console.log("Failed to send reset link to email!!!", err);
      setError(true);
      setUser({ email: "" });
      // toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1>{loading ? "Processing" : "Reset Password"}</h1>
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

        <button
          className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
            buttonDisabled ? "line-through" : ""
          }  ${emailSent && "hidden"}`}
          onClick={onSignUp}
          disabled={buttonDisabled}
        >
          Send Reset Link
        </button>
        {emailSent && (
          <p className="text-green-600">Reset link sent to your email</p>
        )}
        {error && (
          <p className="text-red-500">Email not found!!!</p>
        )}
        <Link href={`/login`}>Visit Login</Link>
      </div>
    </>
  );
};

export default ResetPasswordRequest;
