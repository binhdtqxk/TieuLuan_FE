import { Grid } from "@mui/material";
import React from "react";
import Navigation from "../Navigation/Navigation";
import HomeSection from "../HomeSection/HomeSection";
import RightPart from "../RightPart/RightPart";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import TwitDetails from "../TweetDetails/TwitDetails";
import Notifications from "../Notification/Notifications";
import DirrectMessage from "../DirectMessage/DirrectMessage";
import AdminDashboard from "../Admin/AdminDashBoard";


const HomePage = () => {
    const location = useLocation();
    const isMessagePage = location.pathname.includes("/messages");
    const isAdminPage = location.pathname.includes("/admin");
    
    if (isAdminPage) {
      return (
        <Grid container xs={12} className="px-5 lg:px-36 justify-between">
          <Grid item xs={0} lg={3} className="hidden lg:block w-full relative pl-20">
            <Navigation />
          </Grid>
          <Grid item xs={12} lg={9} className="w-full relative" sx={{ border: "1px solid rgba(11, 8, 8, 0.15)" }}>
            <Routes>
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container xs={12} className="px-5 lg:px-36 justify-between">
        <Grid
          item
          xs={0}
          lg={3}
          className="hidden lg:block w-full relative pl-20"
        >
          <Navigation />
        </Grid>
        {isMessagePage ? (
          <Grid
            item
            xs={12}
            lg={9}
            className="hidden lg:block w-full relative"
            sx={{ border: "1px solid rgba(11, 8, 8, 0.15)" }}
          >
            <Routes>
              <Route path="/messages" element={<DirrectMessage />}></Route>
              <Route path="/messages/:recipientId" element={<DirrectMessage />}></Route>
            </Routes>
          </Grid>
        ) : (
          <>
            <Grid
              item
              xs={12}
              lg={6}
              className="hidden lg:block w-full relative py-2"
              sx={{ border: "1px solid rgba(11, 8, 8, 0.15)" }}
            >
              <Routes>
                <Route path="/" element={<HomeSection />}></Route>
                <Route path="/home" element={<HomeSection />}></Route>
                <Route path="/profile/:id" element={<Profile />}></Route>
                <Route path="/twit/:id" element={<TwitDetails />}></Route>
                <Route path="/notifications" element={<Notifications />}></Route>
                <Route path="/messages" element={<DirrectMessage />}></Route>
              </Routes>
            </Grid>
            <Grid
              item
              xs={0}
              lg={2.5}
              className="hidden lg:block w-full relative"
            >
              <RightPart />
            </Grid>
          </>
        )}
      </Grid>
    );
};

export default HomePage;