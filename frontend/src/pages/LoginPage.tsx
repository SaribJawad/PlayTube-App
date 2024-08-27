import React, { useEffect } from "react";
import SubmitButton from "../components/SubmitButton";
import FormInput from "../components/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useLogin from "../customHooks/useLogin";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const { mutateAsync: login, error } = useLogin();

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        closeButton: false,
      });
    }
  }, [error]);

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data);
  };

  if (auth.loading) {
    return (
      <div className=" min-h-[100vh]  flex-col bg-[#121212] text-white flex justify-center items-center">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className=" min-h-[100vh]  flex-col bg-[#121212] text-white flex justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
      <h1 className="text-center text-[40px] font-bold font-Montserrat">
        Play<span className="text-red-700">Tube</span>
      </h1>
      <p className="font-Montserrat text-zinc-300">
        Log In and Let’s Get Started!
      </p>
      <div className=" mt-20  min-w-[360px] flex justify-center  flex-col ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action="api/v1/users/login"
          className="flex items-center  flex-col gap-8"
        >
          <FormInput
            id="email"
            name="email"
            placeholder="Enter your email"
            errors={errors.email?.message}
            register={register}
          />
          <FormInput
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            errors={errors.password?.message}
            register={register}
          />
          <SubmitButton label="Login" />
        </form>
      </div>
      <h3 className="mt-8">
        Dont have an account?{" "}
        <Link
          className="underline hover:font-semibold transition-all duration-200 ease-in-out"
          to="/auth/signup"
        >
          Sign up now
        </Link>
      </h3>
    </div>
  );
};

export default LoginPage;
