import React from "react";
import { UseFormRegister } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";

interface SignUpFormInputs {
  email: string;
  password: string;
  fullname: string;
  username: string;
  avatar: FileList;
}

interface UploadFileInputProps {
  id: string;
  label: string;
  name: keyof SignUpFormInputs;
  errors?: string;
  register: UseFormRegister<SignUpFormInputs>;
}

const UploadFileInput: React.FC<UploadFileInputProps> = ({
  id,
  label,
  name,
  register,
  errors,
}) => {
  return (
    <>
      <label
        className="text-[17px]  w-[50%] text-center text-gray-400  text-sm bg-gray-100 file:cursor-pointer p-2 cursor-pointer    file:text-white"
        htmlFor={id}
      >
        <span className=" flex items-center gap-2">
          <RxAvatar size={30} />
          {label}
        </span>
        <input id={id} type="file" className="hidden" {...register(name)} />
        {errors && (
          <p className="absolute  ml-[-9px] text-red-500 text-sm mt-3 ">
            {errors}
          </p>
        )}
      </label>
    </>
  );
};

export default UploadFileInput;
