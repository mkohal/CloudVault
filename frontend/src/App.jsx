import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import axios from "axios";
import { AuthProvider } from "../authContext";
import About from "./components/About";
import Contact from "./components/Contact";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="w-full">
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Navbar />
          <Login />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <Navbar />
          <Signup />
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <Navbar />
          <About />
        </div>
      ),
    },
    {
      path: "/contact",
      element: (
        <div>
          <Navbar />
          <Contact />
        </div>
      ),
    }
  ]);

  return (
    <AuthProvider>
      <div className="flex flex-col w-full min-h-screen">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
