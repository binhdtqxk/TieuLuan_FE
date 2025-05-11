import React, { useEffect } from "react";
import { adminNavigation, navigation } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import {Badge, Button, Avatar, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { clearNotificationIndicator, receiveNotification } from "../../Store/Notification/Action";
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navigation = () => {
  const { auth, noti } = useSelector((store) => store);
  const dispatch= useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  };
  
  // Check if user has admin role
  const isAdmin = auth?.user?.role?.role === 'ROLE_ADMIN';

  useEffect(()=>{
    const socket= new SockJS('http://localhost:3000/ws');
    const stompClient= new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      onConnect: () => {
        stompClient.subscribe('/topic/notifications', msg => {
          console.log("[WS] Raw STOMP message:", msg);
          const notification = JSON.parse(msg.body);
          console.log("[WS] Parsed notification:", notification);
          if(auth?.user?.id === notification?.recipient?.id){
            dispatch(receiveNotification(notification));
          }
        })
      },
      onStompError: frame =>{
        console.error('STOMP error: ', frame);
      }
    });
    stompClient.activate();
    return () => stompClient.deactivate();
  },[dispatch, auth?.user?.id])

  return (
    <div className="h-screen sticky top-0">
      <div className="py-2">
        <svg
          height={30}
          width={30}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci
            r-m327ed r-494qqr"
        >
          <g>
            <path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 
            17.52h1.833L7.084 4.126H5.117z"
            ></path>
          </g>
        </svg>
      </div>
      <div className="space-y-6">
      {navigation.map((item) => {
          const isNotif = item.title === "Notification";
          const Icon = isNotif ? (
            <Badge
              color="error"
              variant="dot"
              invisible={!noti.haveNoti}
            >
              <NotificationsIcon />
            </Badge>
          ) : (
            item.icon
          );

          return (
            <div
              key={item.title}
              className="cursor-pointer flex space-x-3 items-center text-2xl mt-1.5"
              onClick={() =>
                isNotif
                  ? (dispatch(clearNotificationIndicator()), navigate(item.path))
                  : item.title === "Profile"
                  ? navigate(`/profile/${auth?.user?.id}`)
                  : navigate(item.path)
              }
            >
              {Icon}
              <p className="text-2xl m-0">{item.title}</p>
            </div>
          );
        })}

        {/* Render admin navigation if user has admin role */}
        {isAdmin && adminNavigation.map((item) => (
          <div
            key={item.title}
            className="cursor-pointer flex space-x-3 items-center text-2xl mt-1.5"
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <p className="text-2xl m-0">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="py-10">
        <Button
          sx={{
            width: "100%",
            borderRadius: "29px",
            py:"10px",
            mb:"15px",
            bgcolor: "#1e88e5",
          }}
          variant="contained"
        >
          Post
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="items-center space-x-3">
          <Avatar
            alt="username"
            src={auth?.user?.image}
          />
        </div>
        <div>
          <span>{auth.user?.fullName}</span>
          <span className="opacity-70">@{auth.user?.fullName?.split(" ").join("_").toLowerCase()}</span>
        </div>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navigation;
