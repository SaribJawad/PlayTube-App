import React from "react";
import SubmitButton from "../components/SubmitButton";

const LoginPage: React.FC = () => {
  return (
    <div className=" min-h-[100vh]  flex-col bg-[#121212] text-white flex justify-center items-center">
      <h1 className="text-center text-[40px] font-bold font-Montserrat">
        Play<span className="text-red-700">Tube</span>
      </h1>
      <p className="font-Montserrat text-zinc-300">
        Log In and Let’s Get Started!
      </p>
      <div className="mt-20  min-w-[360px] flex justify-center  flex-col">
        <form
          action="api/v1/users/login"
          className="flex items-center  flex-col"
        >
          <div className="w-full">
            <label className="text-[17px] font-normal" htmlFor="email">
              Email:
            </label>
            <br />
            <input
              className="text-black text-[17px] w-[100%] mb-8 p-3 mt-2 rounded-lg outline-none input-field"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="w-full">
            <label className="text-[17px] font-normal" htmlFor="password">
              Password:
            </label>
            <br />
            <input
              className="text-black text-[17px] w-[100%]  p-3 mt-2 rounded-lg outline-none input-field"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <SubmitButton label="Login" />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
