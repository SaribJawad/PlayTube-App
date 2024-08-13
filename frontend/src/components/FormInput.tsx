import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface SignUpFormInputs {
  email: string;
  password: string;
  fullname: string;
  username: string;
  avatar: FileList;
}

interface LoginFormInputs {
  email: string;
  password: string;
  username?: string;
  fullname?: string;
  avatar?: FileList;
}

interface FormInputProps {
  label?: string;
  type?: string;
  id: string;
  name: keyof LoginFormInputs;
  placeholder: string;
  errors?: string;
  register:
    | UseFormRegister<LoginFormInputs>
    | UseFormRegister<SignUpFormInputs>;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  id,
  name,
  placeholder,
  errors,
  register,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-[17px] font-light" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        className={`text-black text-[16px] w-[100%] p-3 outline-none ${
          errors ? "border-red-500 border-2" : ""
        }`}
        type={type ? type : "text"}
        id={id}
        placeholder={placeholder}
        {...register(name)}
      />
      {errors && <p className="absolute text-red-500 text-sm mt-1">{errors}</p>}
    </div>
  );
};

export default FormInput;
