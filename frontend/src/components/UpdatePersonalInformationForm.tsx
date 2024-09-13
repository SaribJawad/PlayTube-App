import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface FormValues {
  fullname: string;
  email: string;
}

interface UpdatePersonalInformationFormProps {
  onSubmit: (arg: FormValues) => void;
}

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Fullname is required")
    .min(3, "Fullname must be at least 3 characters")
    .max(50, "Fullname must not exceed 50 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

const UpdatePersonalInformationForm: React.FC<
  UpdatePersonalInformationFormProps
> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  function submit(data: FormValues) {
    onSubmit(data);
  }

  return (
    <div className="border border-zinc-700 p-6 lg:w-[50%] w-[100%] rounded-lg">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2 items-start"
      >
        <label htmlFor="fullname">Fullname</label>
        <input
          type="text"
          id="fullname"
          className={`w-full bg-black p-2 border ${
            errors.fullname ? "border-red-500" : "border-zinc-700"
          } outline-none rounded-lg`}
          placeholder="Enter your full name"
          {...register("fullname")}
        />
        {errors.fullname && (
          <p className="text-red-500 text-sm">{errors.fullname.message}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className={`w-full bg-black p-2 border ${
            errors.email ? "border-red-500" : "border-zinc-700"
          } outline-none rounded-lg`}
          placeholder="Enter your email address"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <button
          className="button-animation px-2 py-[8px] flex items-center gap-2 self-end mt-8 bg-red-800"
          type="submit"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default UpdatePersonalInformationForm;
