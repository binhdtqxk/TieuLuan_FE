import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewMessageModal = ({ open, handleClose, onUserSelect }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const followers = user?.followers || [];

  const handleUserClick = (id) => {
    navigate(`/messages/${id}`)
    handleClose();
  };

  const filteredFollowers = followers.filter(follower =>
    follower.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          bgcolor: "background.paper",
          maxHeight: "70vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(11, 8, 8, 0.15)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleClose} sx={{ mr: 1 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">New message</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ padding: 0 }}>
        <Box sx={{ padding: "8px 16px" }}>
          <TextField
            fullWidth
            placeholder="Search followers"
            variant="standard"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
          />
        </Box>

        {followers.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {filteredFollowers.map((follower) => (
              <Box
                key={follower?.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "rgba(15, 20, 25, 0.1)" },
                }}
                onClick={() => handleUserClick(follower?.id)}
              >
                <Avatar
                  src={follower?.image}
                  alt={follower?.fullName}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {follower?.fullName}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageModal;
