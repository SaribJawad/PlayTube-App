import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

interface UpdatePasswordFormProps {
  onSubmit: (arg: FormValues) => void;
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) });

  function submit(data: FormValues) {
    onSubmit(data);
  }
  return (
    <div className="border border-zinc-700 p-6 lg:w-[50%] w-[100%] rounded-lg">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2 items-start"
      >
        <label htmlFor="oldPassword">Old password</label>
        <input
          type="password"
          id="oldPassword"
          className={`w-full bg-black p-2 border ${
            errors.oldPassword ? "border-red-500" : "border-zinc-700"
          } outline-none rounded-lg`}
          placeholder="Enter your old password"
          {...register("oldPassword")}
        />
        {errors.oldPassword && (
          <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
        )}
        <label htmlFor="newPassword">New password</label>
        <input
          type="password"
          id="newPassword"
          className={`w-full bg-black p-2 border ${
            errors.newPassword ? "border-red-500" : "border-zinc-700"
          } outline-none rounded-lg`}
          placeholder="Enter new password"
          {...register("newPassword")}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
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

export default UpdatePasswordForm;
