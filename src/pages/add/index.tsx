import React from "react";
import Form from "../../components/Form";
import { Link, useNavigate } from "react-router-dom";
import { addEmployee } from "../../services";
import toast from "react-hot-toast";

function Add() {
  const navigate = useNavigate()
  async function handleFormSubmit(payload: any) {
    try {
      await addEmployee(payload);
      toast.success("New Employee Added.");
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="border rounded-md p-2 my-4 container mx-auto">
      <div className="flex items-center py-4">
        <Link to={`/`} className="border rounded-md p-1">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </Link>
        <div className="w-full flex items-center justify-center ">
          <p className="font-bold text-xl">Add New Employee</p>
        </div>
      </div>
      <div className="w-1/2 mx-auto my-4">
        <Form formHandler={handleFormSubmit} />
      </div>
    </div>
  );
}

export default Add;
