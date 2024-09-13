import React from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import useUpdatePassword from "../customHooks/useUpdatePassword";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

const UserUpdatePasswordSection: React.FC = () => {
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  async function onSubmit(data: FormValues) {
    await updatePassword(data, {
      onSuccess: () => {
        toast.success("Password updated successfully ");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  }

  if (isPending) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  ">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="  w-full flex justify-between gap-5 lg:flex-row flex-col">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Password</h1>
        <p className="text-sm text-zinc-500">
          Please enter your current and new password to change your password.{" "}
        </p>
      </div>
      <UpdatePasswordForm onSubmit={onSubmit} />
    </div>
  );
};

export default UserUpdatePasswordSection;
