import React from "react";
import {
  Menu,
  MenuItem,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const MoreMenu = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();

  const handleYourAccount = () => {
    handleClose();
    navigate("/settings/account");
  };
  
  const handleChangePassword = () => {
    handleClose();
    navigate("/settings/password");
  };

  return (
    <Menu
      id="more-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "more-button",
      }}
    >
      <MenuItem onClick={handleYourAccount} sx={{ display: "flex", gap: 1 }}>
        <AccountCircleIcon fontSize="small" />
        Your account
      </MenuItem>
      <MenuItem onClick={handleChangePassword} sx={{ display: "flex", gap: 1 }}>
        <LockIcon fontSize="small" />
        Change your password
      </MenuItem>
    </Menu>
  );
};

export default MoreMenu;