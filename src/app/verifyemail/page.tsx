"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmail() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const payload = {
        token,
      };
      const response = await axios.post("/api/users/verifyemail", payload);
      console.log(response.data.success);
      if (response.data.success) setIsVerified(true);
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    const url = window.location.search.split("=")[1];
    console.log(`url`, url);

    setToken(url || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) verifyUserEmail();
  }, [token]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen w-full bg-gray-700 text-white">
      <h1>User Verification</h1>
      {error && <h1 className="text-rose-600">Error Occured </h1>}
      {isVerified && <h1 className="text-green-600">User Verified</h1>}
      <Link
        href={"/login"}
        className="cursor-pointer px-3 py-2 rounded-md bg-blue-500 text-gray-100 hover:bg-blue-600 hover:scale-105 transition-all ease-in-out duration-300"
      >
        Login
      </Link>
    </div>
  );
}
