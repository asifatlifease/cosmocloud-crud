import React from "react";

interface IInputProps {
  label: string;
  htmlFor?: string;
  type: string;
  id?: string;
  name?: string;
  value: string | number;
  onChange: (e: any) => void;
  placeholder: string;
  isRequired?: boolean;
}

function Input({
  label = "",
  htmlFor = "",
  type = "text",
  id = "",
  name = "",
  value,
  onChange,
  placeholder,
  isRequired = false,
}: IInputProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required={isRequired}
      />
    </div>
  );
}

export default Input;
