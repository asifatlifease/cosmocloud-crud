import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { IEmployee } from "../home";
import Form from "../../components/Form";
import { fetchEmployeeDetails, updateEmployeeDetails } from "../../services";
import toast from "react-hot-toast";

function Edit() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();

  const { isLoading, startLoading, stopLoading } = useLoading();
  const [employeeDetails, setEmployeeDetails] = useState<IEmployee>();

  async function handleUpdateEmployeeDetails(values: any) {
    try {
      const { _id, ...details } = values;
      await updateEmployeeDetails(id, details);
      toast.success("Updated Successfully.");
      navigate(redirectTo === "home" ? "/" : `/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFetchDetails() {
    try {
      startLoading();
      const data = await fetchEmployeeDetails(id);
      setEmployeeDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    handleFetchDetails();
  }, []);

  return (
    <div className="container mx-auto rounded-md border my-4 p-2">
      <div className="flex justify-between items-center py-4">
        <Link
          to={redirectTo === "home" ? "/" : `/${redirectTo}/${id}`}
          className="border rounded-md p-1"
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
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
        </Link>
      </div>

      <div className="mx-auto w-1/2 my-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form
          isEdit={true}
          initialData={employeeDetails}
          formHandler={handleUpdateEmployeeDetails}
        />
      )}
      </div>
    </div>
  );
}

export default Edit;
