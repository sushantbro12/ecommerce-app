import React from "react";
import phoneimage from "../assets/signup.jpg";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="mt-6 mx-4 lg:mx-24 flex flex-col items-center md:flex-row justify-center md:mt-14">
      <div className="w-full flex items-center justify-center mb-6">
        <img src={phoneimage} alt="Phone with Cart" className="w-full" />
      </div>

      <div className="w-full flex flex-col justify-center px-4 md:ml-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login to Exclusive
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your details to log in
        </p>

        <form className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email or Phone Number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Log in
          </button>
        </form>

        <div className="text-center my-4">or</div>

        <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">
          <FcGoogle size={25} className="mr-2" />
          Log in with Google
        </button>

        <p className="mt-4 mb-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
