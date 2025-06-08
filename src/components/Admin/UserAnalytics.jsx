import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { PeopleOutline } from '@mui/icons-material';
import { getUserAnalytics } from '../../Store/Admin/Action';

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

const UserAnalytics = () => {
  const dispatch = useDispatch();
  const { userAnalytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!userAnalytics) {
      dispatch(getUserAnalytics());
    }
  }, [dispatch, userAnalytics]);

  if (loading.user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userAnalytics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No user analytics data available</Typography>
      </Box>
    );
  }

  // Convert chart data to format needed by Recharts
  const userGrowthData = userAnalytics.userGrowthChart.labels.map((label, index) => ({
    name: label,
    [userAnalytics.userGrowthChart.series[0].name]: userAnalytics.userGrowthChart.series[0].data[index]
  }));

  const userActivityData = userAnalytics.userActivityChart.labels.map((label, index) => ({
    name: label,
    [userAnalytics.userActivityChart.series[0].name]: userAnalytics.userActivityChart.series[0].data[index]
  }));

  const mostFollowedUsersData = userAnalytics.mostFollowedUsersChart.labels.map((label, index) => ({
    name: label,
    [userAnalytics.mostFollowedUsersChart.series[0].name]: userAnalytics.mostFollowedUsersChart.series[0].data[index]
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Users" 
            value={userAnalytics.totalUsers} 
            icon={<PeopleOutline />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="New Users" 
            value={userAnalytics.newUsers} 
            icon={<PeopleOutline color="secondary" />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Active Users" 
            value={userAnalytics.activeUsers} 
            icon={<PeopleOutline color="success" />} 
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
                data={userGrowthData}
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
                  dataKey={userAnalytics.userGrowthChart.series[0].name}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>


        {/* Most Followed Users Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Most Followed Users
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={mostFollowedUsersData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={userAnalytics.mostFollowedUsersChart.series[0].name}
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserAnalytics;