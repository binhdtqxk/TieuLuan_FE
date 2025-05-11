import { useDispatch, useSelector } from "react-redux";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
import React from 'react'
import AdminDashboard from "./components/Admin/AdminDashBoard";

export const routes = (isLoggedIn) => {
  // Basic routes for logged-in and non-logged-in users
  const baseRoutes = [
    {
      path: "/*",
      Component: isLoggedIn ? HomePage : Authentication
    },
  ];

  // If user is logged in and has admin role, add admin routes
  if (isLoggedIn && isLoggedIn.role?.role === 'ROLE_ADMIN') {
    return [
      ...baseRoutes,
      {
        path: "/admin/*",
        Component: AdminDashboard
      }
    ];
  }

  return baseRoutes;
};
