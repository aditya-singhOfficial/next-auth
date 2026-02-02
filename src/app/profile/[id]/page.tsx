"use client";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfile({ params }: any) {
  const { id } = params;

  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      toast.success("Logout Successfully!!");
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };
  return (
    <div className="p-10">
      <nav className="border-b pb-5 mb-10 flex justify-between">
        <h1>Hello! {id}</h1>
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
  );
}
