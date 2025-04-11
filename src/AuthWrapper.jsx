import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from './Store/Auth/Action';
import { routes } from './router';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
const AuthWrapper = () => {
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate=useNavigate();


  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getUserProfile(jwt));
      navigate("/");
    }
  }, [jwt, auth.user]);


  return (
    <Routes>
      {routes(auth.user).map((item, index) => {
        const Page = item.Component;
        return <Route key={index} path={item.path} element={<Page />} />;
      })}
    </Routes>
  );
};

export default AuthWrapper;
