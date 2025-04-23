import React from "react";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NotificationItem = (item) => {
  return (
    <Grid
      container
      spacing={0}
      sx={{
        borderTop: "1px solid rgba(11, 8, 8, 0.15)",
        borderBottom: "1px solid rgba(11, 8, 8, 0.15)",
        p: 1,
      }}
    >
      <Grid item xs={1}>
        <Box
          component="svg"
          viewBox="0 0 24 24"
          width={30}
          height={30}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.99 11.295l-6.986-2.13-.877-.326-.325-.88L12.67.975c-.092-.303-.372-.51-.688-.51-.316 0-.596.207-.688.51l-2.392 7.84-1.774.657-6.148 1.82c-.306.092-.515.372-.515.69 0 .32.21.6.515.69l7.956 2.358 2.356 7.956c.09.306.37.515.69.515.32 0 .6-.21.69-.514l1.822-6.15.656-1.773 7.84-2.392c.303-.09.51-.37.51-.687 0-.316-.207-.596-.51-.688z" />
        </Box>
      </Grid>
      <Grid item xs={11}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar alt="username" src={item?.sender?.image} />
          </Stack>
          <Typography variant="body1">
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {item?.content}
            </Box>{" "}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NotificationItem;
