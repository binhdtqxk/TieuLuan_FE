import React from "react";
import { navigation } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";

const Navigation = () => {
  const { auth } = useSelector((store) => store);
  const dispatch= useDispatch();
  console.log(auth);
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
  return (
    <div className="h-screen sticky top-0">
      <div className="py-2">
        <svg
          height={30}
          width={30}
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci
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
        {navigation.map((item) => (
          <div
            className="cursor-pointer flex space-x-3 items-center 
            text-2xl mt-1.5"
            onClick={() =>
              item.title === "Profile"
                ? navigate(`/profile/${auth?.user?.id}`)
                : navigate(item.path)
            }
          >
            {item.icon}
            <p className="text-2xl p-0 mb-0">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="py-10">
        <Button
          sx={{
            width: "100%",
            borderRadius: "29px",
            py: "15px",
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
