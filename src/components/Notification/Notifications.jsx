// Notifications.jsx
import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import NotificationItem from "./NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { clearNotificationIndicator, getUserNotification } from "../../Store/Notification/Action";

const Notifications = () => {
  const [tabValue, setTabValue] = useState("1");
  const {noti}=useSelector((store)=>store);
  const dispatch=useDispatch();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

 useEffect(()=>{
    dispatch(getUserNotification());
    dispatch(clearNotificationIndicator());
  },[])

  return (
    <Box>
      <Typography variant="h4" sx={{ pl: 2, py: 1, fontWeight: "bold", fontSize: 25 }}>
        Notifications
      </Typography>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="Notification Tabs">
              <Tab label="All" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <Grid container spacing={0}>
              {noti?.notificationList?.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <NotificationItem {...item} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Notifications;
