import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { ChatBubbleOutline, LoopOutlined, ReplyOutlined } from '@mui/icons-material';
import { getTweetAnalytics } from '../../Store/Admin/Action';

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

const TweetAnalytics = () => {
  const dispatch = useDispatch();
  const { tweetAnalytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!tweetAnalytics) {
      dispatch(getTweetAnalytics());
    }
  }, [dispatch, tweetAnalytics]);

  if (loading.tweet) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!tweetAnalytics) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">No tweet analytics data available</Typography>
      </Box>
    );
  }

  // Convert chart data to format needed by Recharts
  const tweetsOverTimeData = tweetAnalytics.tweetsOverTimeChart.labels.map((label, index) => {
    const data = { name: label };
    tweetAnalytics.tweetsOverTimeChart.series.forEach(series => {
      data[series.name] = series.data[index];
    });
    return data;
  });

  const topTweetersData = tweetAnalytics.topTweetersChart.labels.map((label, index) => ({
    name: label,
    [tweetAnalytics.topTweetersChart.series[0].name]: tweetAnalytics.topTweetersChart.series[0].data[index]
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Tweets" 
            value={tweetAnalytics.totalTweets} 
            icon={<ChatBubbleOutline />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Retweets" 
            value={tweetAnalytics.totalRetweets} 
            icon={<LoopOutlined />} 
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard 
            title="Total Replies" 
            value={tweetAnalytics.totalReplies} 
            icon={<ReplyOutlined />} 
          />
        </Grid>

        {/* Tweets Over Time Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Tweets Activity Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={tweetsOverTimeData}
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
                {tweetAnalytics.tweetsOverTimeChart.series.map((series, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={series.name}
                    stroke={index === 0 ? "#8884d8" : "#82ca9d"}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Tweeters Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Top Tweeters
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={topTweetersData}
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
                  dataKey={tweetAnalytics.topTweetersChart.series[0].name}
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

export default TweetAnalytics;