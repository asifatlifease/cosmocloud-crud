import React from "react";
import { IContactMethod, IEmployee } from "../../pages/home";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteEmployee } from "../../services";

interface ITableProps {
  data: IEmployee[];
  isLoading: boolean;
}

function Table({ data, isLoading }: ITableProps) {
  const navigate = useNavigate();
  async function handleDelete(id: any) {
    try {
      await deleteEmployee(id);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }

  function handleEmployeeDetails(id: any) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              SR No.
            </th>
            <th scope="col" className="px-6 py-3 ">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Contacts
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="font-bold text-lg text-center py-10">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={5} className="font-bold text-lg text-center py-10">
                No Data !
              </td>
            </tr>
          ) : (
            data?.map((item: IEmployee, index: number) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td
                  className="px-6 py-4 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleEmployeeDetails(item?._id)}
                >
                  {item?.name}
                </td>
                <td className="px-6 py-4">
                  {Object.values(item?.address).join(", ")}
                </td>
                {item?.contact_methods?.map(
                  (contact: IContactMethod, index: number) => (
                    <td className="flex flex-col gap-1">
                      {contact?.contact_method}: {contact?.value.toString()}
                    </td>
                  )
                )}
                <td>
                  <div className="flex items-center gap-1 z-50">
                    <svg
                      onClick={() => handleDelete(item?._id)}
                      className="w-[18px] h-[18px] text-red-600 dark:text-white"
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
                    <Link to={`/edit/${item?._id}?redirectTo=home`}>
                      <svg
                        className="w-[18px] h-[18px] text-gray-800 dark:text-white"
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
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
