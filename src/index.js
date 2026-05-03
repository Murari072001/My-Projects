import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Dashboard from './features/dashboard/Dashboard';
import Login from './features/user/Login';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AddTicket from './features/dashboard/AddTicket';
import ListTickets from './features/dashboard/ListTickets';
import SignUp from './features/user/SignUp.jsx';
import AllUsers from './features/dashboard/AllUsers';
import UserDetails from './features/dashboard/UserDetails';
import RoleRouter from './features/dashboard/RoleRouter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path:"",
        element:<Login></Login>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signUp",
        element:<SignUp></SignUp>
      },
      {
        path:"/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
          {
            index: true,
            element: <RoleRouter></RoleRouter>
          },
          {
            path:"addTicket",
            element:<AddTicket></AddTicket>
          },
          {
            path:"users",
            element:<AllUsers></AllUsers>
          },
          {
            path:"users/:userId",
            element:<UserDetails></UserDetails>
          }
        ]
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals