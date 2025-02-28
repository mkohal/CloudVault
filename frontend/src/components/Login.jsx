import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // name here is the name attribute

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData; // formdata cho username te password extract kita destructuring krke
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      // data ek propert hai axios response object ki isliye {data} ese access kr rhe hai
      // you can also write   const response = await .......
      // but fr data access krne k liye response.data krna padna tha
      // aur token k liye response.data.token
      // ek bar axios response dekh lena kosni konsi properties hai usme
      // hun asi post request send kiti hai user credentials nal
     // response ch backend cho jehda data ayega request marke o store hoyega
      // When you make an HTTP request with Axios, it returns a response object. This response object contains
      // several properties, and one of them is .data, which holds the actual response from the backend.
      // so we can directly write data for storing response or can futher use reponse.data to fetech data

      console.log("Response from backend:", data);
      localStorage.setItem("token", data.token);
      login(data.token);
      setFormData({ username: "", password: "" });
      toast.success(`${username} logged in successfully!`);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 h-screen w-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-lg transform -translate-y-8"
      >
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          Login
        </h2>

        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
          focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
          focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 
        font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-500 
        dark:hover:bg-blue-600 dark:focus:ring-blue-700 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
