import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { IContactMethod, IEmployee } from "../home";
import { deleteEmployee, fetchEmployeeDetails } from "../../services";
import toast from "react-hot-toast";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [employeeDetails, setEmployeeDetails] = useState<IEmployee>({
    name: "Mohammad Asif",
    address: {
      line1: "ava",
      city: "ava",
      country: "avavav",
      zip_code: "avas",
    },
    contact_methods: [
      {
        contact_method: "phone",
        value: "12245544",
      },
      {
        contact_method: "email",
        value: "gmail.com",
      },
    ],
  });

  async function handleDeleteEmployee() {
    try {
      await deleteEmployee(id);
      toast.success("Employee is deleted.");
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  async function handleFetchDetails() {
    try {
      startLoading();
      const data = await fetchEmployeeDetails(id);
      setEmployeeDetails(data);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    handleFetchDetails();
  }, []);

  return (
    <div className="my-4 p-4 container mx-auto border rounded-md h-[500px]">
      <div className="flex gap-2 items-center justify-between">
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
      </div>
      <div className="">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <p className="font-bold">Loading...</p>
          </div>
        ) : employeeDetails === undefined ? (
          <div className="flex items-center justify-center">
            <p>No data found!</p>
          </div>
        ) : (
          <div className="w-[40%] mx-auto my-4">
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg">Employee Details</p>
              <div className="flex gap-2">
                <Link
                  to={`/edit/${id}?redirectTo=details`}
                  className="flex items-center gap-1"
                >
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
                      d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                    />
                  </svg>
                </Link>

                <svg
                  onClick={() => handleDeleteEmployee()}
                  className="w-[20px] h-[20px] text-red-600 dark:text-white cursor-pointer"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </div>
            </div>

            <div className=" border rounded-md p-4 ">
              <p>Name: {employeeDetails?.name || "Not Available"}</p>
              <p>
                Address:{" "}
                {Object.values(employeeDetails.address).join(", ") ||
                  "Not Available"}
              </p>
              {employeeDetails?.contact_methods?.map(
                (contact: IContactMethod) => (
                  <p>
                    {contact.contact_method} :{" "}
                    {contact.value || "Not Available"}
                  </p>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
