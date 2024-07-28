import React, { useState } from "react";
import FormInput from "../components/global/FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
function LogIn() {
  const [isloading, setisloading] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, SetErrors] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = "";
    if (!isEmail(values.email)) errors = "email or password invalid";
    SetErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm) {
      setisloading(true);
      axios
        .post("https://trackexpensesapi-production.up.railway.app/auth", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          localStorage.setItem("authToken", res.data);
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            SetErrors(err || "Failed to login");
          } else {
            SetErrors("Failed to login");

          }
          console.log(err)
        })
        .finally(() => {
          setisloading(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {isloading && <Loading />}
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {errors ? (
          <div className="mb-4 text-center text-red-600">{errors}</div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FormInput
              label="Email Address"
              htmlFor="email"
              type="email"
              name="email"
              value={values.email}
              onChange={onChange}
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-6">
            <FormInput
              label="Password"
              name="password"
              value={values.password}
              onChange={onChange}
              placeholder="Enter your password"
              type="password"
              htmlFor="password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-500 hover:underline active:text-violet-400"
          >
            I don't have an account
          </a>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
