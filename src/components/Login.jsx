import React, { useState } from "react";
import Cookies from "js-cookie";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies(["name"]);
  const [existsError, setExistsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setExistsError(false);
    setNotFound(false);
    setSuccess(false);
    setLoading(true);
    if (!formData.username || !formData.password)
      alert("Username Or Password Can't be an empty");
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
      credentials: "include", // Include cookies
      xhrFields: {
        withCredentials: true,
      },
      body: JSON.stringify({ ...formData }),
    });
    if (response.ok) {
      const resp = await response.json(); // Transform the response to JSON
      console.log("after login to check if exists or not.", resp);
      if (resp.status == "bad") setExistsError(true);
      if (resp == "Invalid password") setNotFound(true);
      if (resp == "sucess") {
        setSuccess(true);
        window.location.href = "/home";
      }
    }
    setLoading(false);
  };

  const buttonClickHandler = async (e) => {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {existsError ? (
          <div className="bg-red-100 text-red-600 p-2 rounded mt-2">
            User with that credentials does not exist.
          </div>
        ) : null}

        {notFound ? (
          <div className="bg-red-100 text-red-600 p-2 rounded mt-2">
            {/* User with that credentials does not exist. */}
            Invalid username or password
          </div>
        ) : null}

        {success ? (
          <div className="bg-green-600 text-white p-2 rounded mt-2">
            {/* User with that credentials does not exist. */}
            Logged In Successfully
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold text-center mb-4 pt-5">Login</h2>
        <form onSubmit={formSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type={formData.showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-0 right-0 mt-2 mr-3"
            ></button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center items-center p-5">
            <Puff
              height="80"
              width="80"
              radius={1}
              color="#4fa94d"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : null}
        {/* <button type="submit" onClick={buttonClickHandler}>
          Handle and try
        </button> */}

        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-500 hover:underline">
            Already have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
