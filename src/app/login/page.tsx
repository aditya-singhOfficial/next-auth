"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Logged In Successfully!");
      setTimeout(() => {
        router.push("/profile");
      }, 500);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-700 flex flex-col justify-center items-center text-white h-screen w-full ">
      <div className="w-[30vw] border shadow-2xs rounded-lg mx-auto  p-4 flex flex-col gap-5">
        <h1 className="text-center text-2xl">Login</h1>
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
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Password:</label>
              <input
                className="rounded-lg px-2 py-1 border outline-none"
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="flex justify-between my-6">
              <button
                onClick={onLogin}
                className="bg-blue-600 w-fit mx-auto text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
              >
                Login
              </button>
              <Link
                href={"/forget"}
                className="bg-blue-600 w-fit mx-auto text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
              >
                Forget Password
              </Link>
            </div>

            <Link className="text-center text-blue-300 " href={"/signup"}>
              go to signup page
            </Link>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
