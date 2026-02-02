"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfile({ params }: any) {
  const { id } = params;
  const [user, setUser] = useState({});
  const router = useRouter();
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfully!!");
      setTimeout(() => {
        router.back();
      }, 500);
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };

  const getUserData = async () => {
    const userData = await axios.get("/api/users/whoami");
    setUser(userData.data.data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    user && (
      <div className="p-10">
        <nav className="border-b pb-5 mb-10 flex justify-between">
          <h1>
            Hello!{" "}
            <span className="uppercase font-black font-serif">
              {user.username}
            </span>
          </h1>
          <button
            onClick={onLogout}
            className="px-3 py-2 bg-red-600 rounded-full text-white font-medium cursor-pointer"
          >
            Log Out
          </button>
        </nav>

        <div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    )
  );
}
