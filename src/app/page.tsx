import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-700 flex flex-col justify-center items-center gap-64 text-white h-screen w-full">
      <h1 className="text-2xl font-semibold font-serif">
        Made for learning Authentication using NextJS, NodeMailer, MongoDB
      </h1>
      <div className="flex gap-24">
        <Link
          className="bg-blue-400 text-gray-100 px-3 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          href={"/login"}
        >
          Login
        </Link>
        <Link
          className="bg-blue-400 text-gray-100 px-3 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          href={"/signup"}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
