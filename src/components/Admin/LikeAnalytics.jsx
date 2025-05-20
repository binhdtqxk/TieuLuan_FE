import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { ThumbUpAlt } from '@mui/icons-material';
import { getLikeAnalytics } from '../../Store/Admin/Action';

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

const LikeAnalytics = () => {
  const dispatch = useDispatch();
  const { likeAnalytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!likeAnalytics) {
      dispatch(getLikeAnalytics());
    }
  }, [dispatch, likeAnalytics]);

  if (loading.like) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!likeAnalytics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No like analytics data available</Typography>
      </Box>
    );
  }

  // Convert chart data to format needed by Recharts
  const likesOverTimeData = likeAnalytics.likesOverTimeChart.labels.map((label, index) => ({
    name: label,
    [likeAnalytics.likesOverTimeChart.series[0].name]: likeAnalytics.likesOverTimeChart.series[0].data[index]
  }));

  const mostLikedTweetsData = likeAnalytics.mostLikedTweetsChart.labels.map((label, index) => ({
    name: label,
    [likeAnalytics.mostLikedTweetsChart.series[0].name]: likeAnalytics.mostLikedTweetsChart.series[0].data[index]
  }));

  const mostActiveLikersData = likeAnalytics.mostActiveLikersChart.labels.map((label, index) => ({
    name: label,
    [likeAnalytics.mostActiveLikersChart.series[0].name]: likeAnalytics.mostActiveLikersChart.series[0].data[index]
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Stats Card */}
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Likes" 
            value={likeAnalytics.totalLikes} 
            icon={<ThumbUpAlt />} 
          />
        </Grid>

        {/* Likes Over Time Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Likes Activity Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={likesOverTimeData}
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
                  dataKey={likeAnalytics.likesOverTimeChart.series[0].name}
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Most Liked Tweets Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Most Liked Tweets
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={mostLikedTweetsData}
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
                  dataKey={likeAnalytics.mostLikedTweetsChart.series[0].name}
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Most Active Likers Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Most Active Likers
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={mostActiveLikersData}
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
                  dataKey={likeAnalytics.mostActiveLikersChart.series[0].name}
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LikeAnalytics;