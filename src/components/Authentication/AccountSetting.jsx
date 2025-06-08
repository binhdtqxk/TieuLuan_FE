import React from "react";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Paper } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleChangePassword = () => {
    navigate("/settings/password");
  };
  
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2, 
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)' 
      }}>
        <IconButton onClick={handleBackClick} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Your Account
        </Typography>
      </Box>
      
      <Box sx={{ p: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          See information about your account, download an archive of your data, or learn about your account deactivation options
        </Typography>
        
        <Paper variant="outlined" sx={{ mb: 2 }}>
          <List>
            <ListItem 
              button 
              secondaryAction={
                <ChevronRightIcon />
              }
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Account information" 
                secondary="See your account information like your phone number and email address" 
              />
            </ListItem>
            <Divider />
            <ListItem 
              button 
              onClick={handleChangePassword}
              secondaryAction={
                <ChevronRightIcon />
              }
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Change your password" 
                secondary="Change your password at any time" 
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default AccountSettings;