import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './features/Dashboard';
import Graph from './features/Graph';
import Login from './features/Login';
import AllCompanies from './features/AllCompanies';
import MyStocks from './features/UserFeatures/MyStocks';

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children:[{
      path:"/login",
      element:<Login></Login>
    },
    {
      path:"/dashboard",
      element:<Dashboard></Dashboard>,
      children:[{
        path:'',
        element:<AllCompanies></AllCompanies>
      },
      {
        path:":cname",
        element:<Graph></Graph>
      },
      {
        path:"myStocks",
        element:<MyStocks></MyStocks>
      }]
    }]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

reportWebVitals();
