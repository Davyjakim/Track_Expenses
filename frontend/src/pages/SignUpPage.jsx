import React, { useState } from "react";
import FormInput from "../components/global/FormInput";
import userService from "../services/user-service";
import { useNavigate } from "react-router-dom";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

function SignUpPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  
  const navigate = useNavigate()

  const validateForm = () => {
    const errors = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.password) errors.password = "Password is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        userService.signUp(values)
        .then((data) => {
            setValues(initialValues);
            setIsPopupVisible(true);
        })
        .catch((error) => {
          alert("Sign up failed please try again");
        });
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    navigate("/initialpage");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FormInput
              label="Username"
              type="text"
              name="username"
              id="username"
              value={values.username}
              onChange={onChange}
              errorMessage={errors.username}
            />
          </div>
          <div className="mb-4">
            <FormInput
              label="Email"
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={onChange}
              errorMessage={errors.email}
            />
          </div>
          <div className="mb-6">
            <FormInput
              label="Password"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={onChange}
              errorMessage={errors.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md text-lg hover:bg-indigo-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-500 hover:underline active:text-violet-400"
          >
            Log in here if you have an account
          </a>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="absolute top-28 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Thank you for Signing up</h3>
            <p>We will send an email once your account is created.</p>
            <button
              onClick={closePopup}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md text-lg hover:bg-indigo-500 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPage;
