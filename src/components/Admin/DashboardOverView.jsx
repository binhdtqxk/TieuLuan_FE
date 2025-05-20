import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { PeopleOutline, ChatBubbleOutline, ThumbUpAlt, LoopOutlined, ReplyOutlined } from '@mui/icons-material';

const StatCard = ({ title, value, icon }) => {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        {icon}
      </Box>
      <Typography component="p" variant="h4">
        {value.toLocaleString()}
      </Typography>
    </Paper>
  );
};

const DashboardOverview = () => {
  const { dashboard, loading } = useSelector((state) => state.admin);

  if (loading.dashboard) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!dashboard) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No dashboard data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Users" 
            value={dashboard.totalUsers} 
            icon={<PeopleOutline />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="New Users" 
            value={dashboard.newUsers} 
            icon={<PeopleOutline color="secondary" />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Tweets" 
            value={dashboard.totalTweets} 
            icon={<ChatBubbleOutline />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Likes" 
            value={dashboard.totalLikes} 
            icon={<ThumbUpAlt />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Retweets" 
            value={dashboard.totalRetweets} 
            icon={<LoopOutlined />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Replies" 
            value={dashboard.totalReplies} 
            icon={<ReplyOutlined />} 
          />
        </Grid>

        {/* User Growth Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              User Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={dashboard.userGrowthChart.labels.map((label, index) => ({
                  name: label,
                  users: dashboard.userGrowthChart.series[0].data[index]
                }))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  name={dashboard.userGrowthChart.series[0].name}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Activity Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Platform Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dashboard.activityChart.labels.map((label, index) => {
                  const data = { name: label };
                  dashboard.activityChart.series.forEach((series, seriesIndex) => {
                    data[series.name] = series.data[index];
                  });
                  return data;
                })}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {dashboard.activityChart.series.map((series, index) => (
                  <Bar
                    key={index}
                    dataKey={series.name}
                    fill={index === 0 ? "#8884d8" : "#82ca9d"}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;