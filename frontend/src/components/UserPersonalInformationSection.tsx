import React from "react";
import UpdatePersonalInformationForm from "./UpdatePersonalInformationForm";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useUpdatePersonalInformation from "../customHooks/useUpdatePersonalInformation";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

interface FormValues {
  fullname: string;
  email: string;
}

const UserPersonalInformationSection: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const queryClient = useQueryClient();

  const { mutateAsync: UpdatePersonalInformation, isPending } =
    useUpdatePersonalInformation();

  const onSubmit = async (data: FormValues) => {
    await UpdatePersonalInformation(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["channelDetails", username],
        });
        toast.success("Updated Successfully");
      },
      onError: (error) => {
        console.error("Error updating information:", error);
        toast.error("Failed to update information.");
      },
    });
  };

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
        <h1 className="text-2xl">Personal info</h1>
        <p className="text-sm text-zinc-500">
          Update your photo and personal details.{" "}
        </p>
      </div>
      <UpdatePersonalInformationForm onSubmit={onSubmit} />
    </div>
  );
};

export default UserPersonalInformationSection;
