import React from "react";
import SubmitButton from "../components/SubmitButton";
import FormInput from "../components/FormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // validation schema with yup
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className=" min-h-[100vh]  flex-col bg-[#121212] text-white flex justify-center items-center">
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
        <a
          className="underline hover:font-semibold transition-all duration-200 ease-in-out"
          href="/auth/signup"
        >
          Sign up now
        </a>
      </h3>
    </div>
  );
};

export default LoginPage;
