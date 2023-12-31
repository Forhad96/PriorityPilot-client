import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../layout/DashboardLayout/Dashboard";
import AddTask from "../pages/Dashboard/AddTask/AddTask";
import Home from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Resgister/Register";
// import { Tasks } from "../pages/Tasks/Tasks";

import PrivateRoute from "./PrivateRoutes";
import Contact from "../pages/Contact/Contact";
import About from "../pages/About/About";
import Ongoing from "../pages/Dashboard/Ongoing/Ongoing";
import Tasks from "../pages/Dashboard/Tasks/Tasks";
import Complete from "../pages/Dashboard/Complete/Complete";
import Statistics from "../pages/Dashboard/Statistics/Statistics";
import UpdateTask from "../pages/Dashboard/UpdateTask/UpdateTask";
import Trash from "../pages/Trash/Trash";
import Achieved from "../pages/Achieved/Achieved";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
          element: <Statistics/>,
      },
      {
        path: "addTodo",
        element: <AddTask />,
      },

      {
        path: "tasks",
        // index:true,
        element: <Tasks />,
      },
      {
        path: "ongoing",
        element: <Ongoing />,
      },
      {
        path: "complete",
        element: <Complete />,
      },
      {
        path:'updateTask',
        element:<UpdateTask/>
      }
      ,{
        path:'trash',
        element:<Trash/>
      },
      {
        path:'achieved',
        element:<Achieved/>
      }
    ],
  },
]);
export default route;
