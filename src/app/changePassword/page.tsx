"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ChangePassword() {
  const router = useRouter();

  const [user, setUser] = useState({
    pass: "",
    confirmPass: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const onChangePassword = async (e: any) => {
    e.preventDefault();
    try {
      if (user.pass !== user.confirmPass) {
        toast.error("Password not matched");
        return;
      }

      const token = window.location.search.split("=")[1];

      const payload = {
        pass: user.pass,
        confirmPass: user.confirmPass,
        token,
      };

      const response = await axios.put("/api/users/changePass", payload);
      console.log(response.data);

      toast.success("Password changed successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in changing password:", error.message);
      toast.error("Invalid or expired token");
    }
  };

  return (
    <div className="w-full h-screen flex text-white bg-gray-700 justify-center items-center">
      <div className="w-[30vw] border shadow-2xs rounded-lg mx-auto p-4 flex flex-col gap-5">
        <h1 className="text-center text-2xl font-semibold">Change Password</h1>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label>Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                className="rounded-lg px-2 py-1 pr-10 border outline-none w-full text-black"
                placeholder="Enter Password"
                value={user.pass}
                onChange={(e) => setUser({ ...user, pass: e.target.value })}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPass ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                className="rounded-lg px-2 py-1 pr-10 border outline-none w-full text-black"
                placeholder="Confirm Password"
                value={user.confirmPass}
                onChange={(e) =>
                  setUser({ ...user, confirmPass: e.target.value })
                }
              />
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showConfirmPass ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button
            onClick={onChangePassword}
            disabled={!user.pass || !user.confirmPass}
            className="bg-blue-600 disabled:bg-gray-400 w-fit mx-auto text-white font-semibold px-3 py-1 rounded-full cursor-pointer"
          >
            Change Password
          </button>

          <Link className="text-center text-blue-300" href="/login">
            Go to login
          </Link>
        </form>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
