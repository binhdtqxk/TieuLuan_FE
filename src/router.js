import { useDispatch, useSelector } from "react-redux";
import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";
import React from 'react'

export const routes=(isLoggedIn)=>[
    {
        path: "/*",
        Component: isLoggedIn?HomePage:Authentication
      },
]
