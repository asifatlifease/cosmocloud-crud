import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import axios from "axios";
import { fetchEmployees } from "../../services";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";

interface IAddress {
  line1: string;
  city: string;
  country: string;
  zip_code: string;
}

export interface IContactMethod {
  contact_method: string;
  value: string;
}

export interface IEmployee {
  name: string;
  _id?: string;
  address: IAddress;
  contact_methods: IContactMethod[];
}

function Home() {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  async function handleFetchEmployees() {
    try {
      startLoading();
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    handleFetchEmployees();
  }, []);

  return (
    <div className="container mx-auto border rounded-md p-4 my-4">
      <div className="flex justify-between items-center py-4">
        <p className="text-xl font-bold">Employees</p>
        <Link to="/add" className="bg-blue-500 text-white px-4 py-1 rounded-md">
          Add
        </Link>
      </div>
      <Table data={employees}  isLoading={isLoading}/>
    </div>
  );
}

export default Home;
