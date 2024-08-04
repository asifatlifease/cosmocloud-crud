import axios from "axios";
import { IEmployee } from "../pages/home";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_END_POINT,
  headers: {
    projectId: process.env.REACT_APP_PROJECT_ID,
    environmentId: process.env.REACT_APP_ENVIRONMENT_ID,
  },
});

export async function fetchEmployees() {
  try {
    const { data } = await instance.get(`employee?offset=0&limit=10`);
    return data.data;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

export async function addEmployee(body: IEmployee) {
  try {
    const { data } = await instance.post("employee", body);
    return data;
  } catch (error) {
    return "error";
  }
}

export async function fetchEmployeeDetails(id: any) {
  try {
    const { data } = await instance.get(`employee/${id}`);
    return data;
  } catch (error) {
    return "error";
  }
}

export async function updateEmployeeDetails(id: any, body: any) {
  try {
    const { data } = await instance.patch(`employee/${id}`, body);
    return data;
  } catch (error) {
    return "error";
  }
}

export async function deleteEmployee(id: any) {
  try {
    const { data } = await instance.delete(`employee/${id}`);
    return data;
  } catch (error) {
    return "error";
  }
}
