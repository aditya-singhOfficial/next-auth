"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignUP() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSignUP = async (e: any) => {
    e.preventDefault();
    try {
      if (
        user.username.length <= 0 ||
        user.email.length <= 0 ||
        user.password.length <= 0
      ) {
        toast.error("All fields are required");
        return;
      }
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup Successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gray-700 flex flex-col justify-center items-center text-white h-screen w-full">
      <div className="w-[30vw] border shadow-2xs rounded-lg mx-auto mt-32 p-4 flex flex-col gap-5">
        <h1 className="text-center text-2xl">Sign Up</h1>
        <div>
          <form
            onSubmit={onSignUP}
            method="post"
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username:</label>
              <input
                className="rounded-lg px-2 py-1 border outline-none"
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
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
            <button
              type="submit"
              className="bg-blue-600 w-fit mx-auto text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
            >
              Signup
            </button>
            <Toaster position="top-center" reverseOrder={false} />
            <Link className="text-center text-blue-300 " href={"/login"}>
              go to login page
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
