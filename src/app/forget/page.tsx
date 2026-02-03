"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function forgetPassword() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
  });

  const onForget = async (e: any) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await axios.post("/api/users/forget", user);
      console.log("Forget Success: ", response.data);
      toast.success("Mail Send Successfully");
      setTimeout(() => {
        router.push("/login");
      },500);
    } catch (error: any) {
      console.log("Error in Forgetting password", error.message);
      toast.error("Error in Forgetting password");
    }
  };
  return (
    <div className="bg-gray-700 flex flex-col justify-center items-center text-white h-screen w-full">
      <div className="w-[30vw] border shadow-2xs rounded-lg mx-auto  p-4 flex flex-col gap-5">
        <h1 className="text-center text-2xl">Forget</h1>
        <div>
          <form method="post" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Email:</label>
              <input
                className="rounded-lg px-2 py-1 border outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="flex justify-between my-6">
              <button
                onClick={onForget}
                className="bg-blue-600 w-fit mx-auto text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
              >
                Forget Password
              </button>
            </div>

            <Link className="text-center text-blue-300 " href={"/login"}>
              go to login page
            </Link>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
