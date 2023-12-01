import React, { useState } from "react";
import { Puff } from "react-loader-spinner";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [existsError, setExistsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sucess, setSuccess] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formSubmitHandler = async (e) => {
    setLoading(true);
    setSuccess(false);
    setExistsError(false);
    e.preventDefault();
    console.log(formData);
    if (!formData.username || !formData.password || !formData.confirmPassword)
      alert("Not Enough Details Given");
    if (formData.password !== formData.confirmPassword)
      alert("Password and Confim Password fields doesnot match");

    // const user = await fetch("http://localhost:5000/api/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // Set the Content-Type header
    //   },
    //   body: JSON.stringify({ ...formData }),
    //   credentials: "include", // Include cookies
    // });

    // console.log("user object from testing purposes", user);
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
      credentials: "include",
    });

    if (response.ok) {
      const user = await response.json(); // Transform the response to JSON
      console.log("user object from testing purposes", user);
      if (user.exists) setExistsError(true);
    }

    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
    });
    setLoading(false);
    setSuccess(true);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {existsError ? (
          <h1 className="bg-red-500 text-white p-4 rounded-lg shadow-lg">
            Error: User with that username already exists
          </h1>
        ) : null}

        {sucess ? (
          <h1 className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
            Success: Account created successfully
          </h1>
        ) : null}

        <h2 className="text-2xl font-semibold text-center mb-4 pt-5">
          Register
        </h2>
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
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
          </div>

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

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Log In.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
