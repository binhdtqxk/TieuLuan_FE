import React, { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";

const Profile = () => {
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const handleOpenProfileModel = () => {
    console.log("open profile model");
  };
  const handleFollowUser = () => {
    console.log("follow user");
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === "4") {
      console.log("likes tweet");
    } else if (newValue === "1") {
      console.log("user tweet");
    }
  };
  return (
    <div>
      <section className={`z-50 flex items-center sticky top-0 bg-white/[var(--bg-opacity)] [--bg-opacity:95%]`}>
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="py-2 !text-xl font-bold opacity-100 ml-5 ">Phan Thanh Binh</h1>
      </section>

      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2025/03/09/08/26/bridge-9456745_640.jpg"
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className="flex justify-between item-start mt-3 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="Phan Thanh Binh"
            src="https://pbs.twimg.com/profile_images/1843591782317338628/pGgFUDI9_400x400.png"
            sx={{
              width: "10rem",
              height: "10rem",
              border: "4px solid white",
            }}
          />

          {true ? (
            <Button
              onClick={handleOpenProfileModel}
              variant="contained"
              sx={{
                borderRadius: "20px",
                height: "2.5rem",
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              variant="contained"
              sx={{
                borderRadius: "20px",
                height: "2.5rem",
              }}
            >
              {true ? "Follow" : "UnFollow"}
            </Button>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold !text-lg">Phan Thanh Binh</h1>
            {true && (
              <img
                className="ml-2 w-5 h-5"
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                alt=""
              />
            )}
          </div>
          <h1 className="!text-gray-500 !text-sm">@BinhThanhPhan</h1>
        </div>

        <div className="mt-2 space-y-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse natus vitae id sit praesentium doloremque libero sunt,
            quae, fuga sint quisquam est doloribus ratione iure. Ad repudiandae qui corrupti repellat?
          </p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2 mb-0">Nong Lam University</p>
            </div>

            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2 mb-0">VietNam</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2 mb-0">Joined March 2025</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>100</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {[1, 1, 1, 1].map((item) => (
                <TweetCard />
              ))}
            </TabPanel>
            <TabPanel value="2">User Replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>
    </div>
  );
};

export default Profile;
