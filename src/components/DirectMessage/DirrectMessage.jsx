import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useNavigate, useParams } from "react-router-dom";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ImageIcon from "@mui/icons-material/Image";
import GifBoxIcon from "@mui/icons-material/GifBox";
import SendIcon from "@mui/icons-material/Send";
import NewMessageModal from "./NewMessageModal";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  getConversationMessages,
  getConversations,
  sendMessage,
} from "../../Store/Message/Action";
import { findUserById } from "../../Store/Auth/Action";
import { useStomp } from "../../contexts/WebSocketContext";

const DirrectMessage = () => {
  const [message, setMessage] = useState("");
  const [openNewMessageModal, setOpenNewMessageModal] = useState(false);
  const { recipientId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscribe } = useStomp();

  // Lấy thẳng từ Redux
  const auth = useSelector((state) => state.auth);
  const recipientList = useSelector((state) => state.dm.conversations);
  const currentConversation = useSelector((state) => state.dm.conversation);
  const currentRecipient = useSelector((state) => state.auth.findUser);


  // 1. Load conversations khi mount
  useEffect(() => {
    if (auth.user?.id) {
      dispatch(getConversations(auth.user.id));
    }
  }, [auth.user?.id, dispatch]);

  // 2. Khi recipientId thay đổi thì fetch user + messages
  useEffect(() => {
    if (recipientId) {
      dispatch(findUserById(recipientId));
      dispatch(getConversationMessages(recipientId));
    }
  }, [recipientId, dispatch]);

  useEffect(() => {
    if (!auth.user?.id) return;

    const subscription = subscribe(
      `/user/queue/message`,
      ({ body }) => {
        const newMsg = JSON.parse(body);
        console.log("subscribe roi")
        if (newMsg.recipient.id === auth?.user?.id) {
          dispatch({
            type: "GET_CONVERSATION_MESSAGES",
            payload: [...currentConversation, newMsg]
          });
        }
      }
    );

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [auth.user?.id, currentRecipient?.id, currentConversation, dispatch, subscribe]);

  // 4. Gửi tin nhắn
  const handleSendMessage = () => {
    if (!message.trim()) return;
    const payload = {
      recipientId,
      messageRequest: { content: message },
    };
    dispatch(sendMessage(payload));
    setMessage("");
  };

  // Giữ nguyên toàn bộ JSX/UI của bạn:
  return (
    <>
      <Grid container className="h-screen">
        {/* Left Section - Messages List */}
        <Grid item xs={12} md={4} sx={{ borderRight: "1px solid rgba(11, 8, 8, 0.15)" }}>
          <Box sx={{ padding: "12px 16px", borderBottom: "1px solid rgba(11, 8, 8, 0.15)" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>Messages</Typography>
              <Box>
                <IconButton size="small"><SettingsOutlinedIcon /></IconButton>
                <IconButton size="small" onClick={() => setOpenNewMessageModal(true)}>
                  <MailOutlineIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ position: "relative", marginTop: 2 }}>
              <TextField
                fullWidth
                placeholder="Search Direct Messages"
                variant="outlined"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", backgroundColor: "rgba(231, 233, 234, 0.1)" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box>
            {recipientList.map((recipient) => (
              <Box
                key={recipient.id}
                onClick={() => navigate(`/messages/${recipient.id}`)}
                sx={{
                  display: "flex",
                  padding: "16px",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "rgba(231, 233, 234, 0.1)" },
                }}
              >
                <Avatar src={recipient.image} sx={{ marginRight: 2 }} />
                <Typography variant="body1" fontWeight="bold">{recipient.fullName}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right Section - Chat Content */}
        <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {recipientId ? (
            <>
              <Box sx={{ padding: "12px 16px", borderBottom: "1px solid rgba(11, 8, 8, 0.15)" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={currentRecipient?.image} sx={{ marginRight: 2 }} />
                  <Typography variant="body1" fontWeight="bold">{currentRecipient?.fullName}</Typography>
                </Box>
              </Box>
              <Box sx={{ flexGrow: 1, overflow: "auto", padding: 2, display: "flex", flexDirection: "column" }}>
                {currentConversation.map((msg) => (
                  <Box key={msg.id} sx={{
                    display: "flex", flexDirection: "column",
                    alignItems: msg.sender?.id === auth.user.id ? "flex-end" : "flex-start", mb: 2
                  }}>
                    <Box sx={{
                      display: "flex", alignItems: "flex-start",
                      flexDirection: msg.sender?.id === auth.user.id ? "row-reverse" : "row", gap: 1
                    }}>
                      {msg.sender?.id !== auth.user.id && (
                        <Avatar src={msg.sender.image} sx={{ width: 32, height: 32 }} />
                      )}
                      <Box sx={{
                        backgroundColor: msg.sender?.id === auth.user.id ? "#1D9BF0" : "rgba(231, 233, 234, 0.2)",
                        color: msg.sender?.id === auth.user.id ? "white" : "inherit",
                        padding: "8px 12px", borderRadius: "16px", maxWidth: "70%"
                      }}>
                        <Typography variant="body1" sx={{paddingRight:"1rem"}}>{msg.content}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, mx: 1 }}>
                      {msg.createdAt}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ padding: 2, borderTop: "1px solid rgba(11, 8, 8, 0.15)" }}>
                <TextField
                  fullWidth multiline maxRows={4}
                  placeholder="Start a new message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", padding: "8px 12px" } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <ImageIcon /><GifBoxIcon /><SentimentSatisfiedAltIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleSendMessage} disabled={!message.trim()}>
                          <SendIcon color={message.trim() ? "primary" : "disabled"} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h5" fontWeight="bold">Select a message</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, textAlign: "center", maxWidth: 400 }}>
                Choose from your existing conversations, start a new one, or just keep swimming.
              </Typography>
              <Button variant="contained" sx={{ mt: 3, borderRadius: "20px", textTransform: "none", p: "10px 20px", bgcolor: "#1D9BF0", "&:hover": { bgcolor: "#1a8cd8" } }}
                onClick={() => setOpenNewMessageModal(true)}>
                New message
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>

      <NewMessageModal open={openNewMessageModal} handleClose={() => setOpenNewMessageModal(false)} />
    </>
  );
};

export default DirrectMessage;
