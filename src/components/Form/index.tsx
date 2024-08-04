import React, { useEffect, useState } from "react";
import { IContactMethod, IEmployee } from "../../pages/home";
import Input from "../Input";

interface IFormProps {
  isEdit?: Boolean;
  initialData?: IEmployee | {};
  formHandler: (payload: any) => void;
}

interface ILabel {
  [key: string]: {
    label: string;
    type: string;
  };
}

const label: ILabel = {
  phone: {
    label: "Phone Number",
    type: "tel",
  },
  email: {
    label: "Email Address",
    type: "email",
  },
};

function Form({ isEdit = false, initialData = {}, formHandler }: IFormProps) {
  const [formData, setFormData] = useState<IEmployee>({
    name: "",
    address: {
      line1: "",
      city: "",
      country: "",
      zip_code: "",
    },
    contact_methods: [
      {
        contact_method: "phone",
        value: "",
      },
      {
        contact_method: "email",
        value: "",
      },
    ],
  });

  function handleFormSubmit(e: any) {
    try {
      e.preventDefault();
      const { name, address }: IEmployee = formData;

      if (name === "" || address.city === "") {
        throw new Error("validationError");
      }

      formHandler(formData);

      if (isEdit) return;
      setFormData({
        name: "",
        address: {
          line1: "",
          city: "",
          country: "",
          zip_code: "",
        },
        contact_methods: [
          {
            contact_method: "phone",
            value: "",
          },
          {
            contact_method: "email",
            value: "",
          },
        ],
      });
    } catch (error: any) {
      if (error?.message === "validationError") {
        console.log("All fields are required!");
      }
      console.log("Something went wrong!");
    }
  }

  function handleSetFormInput(key: string, value: any) {
    if (key.includes("contact_method")) {
      const contactMethodKey = key.split(".")[1];
      setFormData((prev: any) => {
        const updatedContactMethods = prev.contact_methods.map(
          (contact: any) => {
            if (contact.contact_method === contactMethodKey) {
              return {
                ...contact,
                value: value,
              };
            }
            return contact;
          }
        );

        return {
          ...prev,
          contact_methods: updatedContactMethods,
        };
      });
      return;
    }

    if (key.includes(".")) {
      const addChildKey = key.split(".")[1];
      setFormData((prev: any) => ({
        ...prev,
        address: {
          ...prev.address,
          [addChildKey]: value,
        },
      }));
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSetInitialFormData() {
    setFormData((prev: any) => ({
      ...prev,
      ...initialData,
    }));
  }

  useEffect(() => {
    if (isEdit) {
      handleSetInitialFormData();
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-6">
          <Input
            label="Name"
            placeholder="John Doe"
            name="name"
            htmlFor="name"
            value={formData?.name}
            onChange={(e: any) => {
              handleSetFormInput("name", e.target.value);
            }}
            id="name"
            type="text"
            isRequired={true}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            label="Line 1"
            isRequired={true}
            type="text"
            id="line1"
            name="line1"
            htmlFor=""
            value={formData?.address?.line1}
            onChange={(e: any) =>
              handleSetFormInput("address.line1", e.target.value)
            }
            placeholder="Sector 142"
          />

          <Input
            htmlFor="city"
            label="City"
            type="text"
            id="city"
            name="city"
            value={formData?.address?.city}
            onChange={(e: any) =>
              handleSetFormInput("address.city", e.target.value)
            }
            placeholder="Noida"
          />

          <Input
            htmlFor="country"
            label="Country"
            type="text"
            id="Country"
            name="country"
            value={formData?.address?.country}
            onChange={(e: any) =>
              handleSetFormInput("address.country", e.target.value)
            }
            placeholder="Flowbite"
          />

          <Input
            htmlFor="zip_code"
            label="Zip Code"
            type="text"
            id="zip_code"
            value={formData?.address?.zip_code}
            onChange={(e: any) =>
              handleSetFormInput("address.zip_code", e.target.value)
            }
            placeholder="123-45-678"
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {formData?.contact_methods?.map((contact: IContactMethod) => (
            <Input
              label={label[contact?.contact_method].label}
              htmlFor={contact.contact_method}
              id={contact.contact_method}
              type="text"
              name={contact.contact_method}
              value={contact.value}
              onChange={(e: any) => {
                const key = `contact_method.${contact.contact_method}`;
                handleSetFormInput(key, e.target.value);
              }}
              placeholder="elonmusk"
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
          text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
