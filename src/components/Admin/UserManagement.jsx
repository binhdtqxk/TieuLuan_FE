import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  CircularProgress,
  Avatar,
  Chip
} from '@mui/material';
import { Search, Block, Check } from '@mui/icons-material';
import { getAllUsers, banUser, unbanUser } from '../../Store/Admin/Action';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openUnbanDialog, setOpenUnbanDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    dispatch(getAllUsers(searchQuery, page, rowsPerPage));
  }, [dispatch, page, rowsPerPage, searchQuery]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(searchQuery, 0, rowsPerPage));
    setPage(0);
  };

  const handleOpenBanDialog = (user) => {
    setSelectedUser(user);
    setOpenBanDialog(true);
  };

  const handleOpenUnbanDialog = (user) => {
    setSelectedUser(user);
    setOpenUnbanDialog(true);
  };

  const handleCloseBanDialog = () => {
    setOpenBanDialog(false);
    setSelectedUser(null);
    setBanReason('');
  };

  const handleCloseUnbanDialog = () => {
    setOpenUnbanDialog(false);
    setSelectedUser(null);
  };

  const handleBanUser = async () => {
    try {
      await dispatch(banUser(selectedUser.id, banReason));
      await dispatch(getAllUsers(searchQuery, page, rowsPerPage));
      handleCloseBanDialog();
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleUnbanUser = async () => {
    try {
      await dispatch(unbanUser(selectedUser.id));
      await dispatch(getAllUsers(searchQuery, page, rowsPerPage));
      handleCloseUnbanDialog();
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  // Check if a user is banned based on verification status
  const isUserBanned = (user) => {
    if (user.verification.status==false && user.role?.role === 'ROLE_USER') {
      return true;
    }
    return false;
  };

  if (loading.allUsers && !users.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          User Management
        </Typography>

        {/* Search Form */}
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 2, display: 'flex' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name or email"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<Search />}
          >
            Search
          </Button>
        </Box>

        {/* Users Table */}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Joined Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.image} alt={user.fullName} sx={{ mr: 2 }} />
                    {user.fullName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.location || 'Not specified'}</TableCell>
                  <TableCell>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {isUserBanned(user) ? (
                      <Chip label="Banned" color="error" size="small" />
                    ) : (
                      <Chip label="Active" color="success" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {isUserBanned(user) ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        startIcon={<Check />}
                        onClick={() => handleOpenUnbanDialog(user)}
                        disabled={loading.unbanUser}
                      >
                        Unban
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<Block />}
                        onClick={() => handleOpenBanDialog(user)}
                        disabled={loading.banUser}
                      >
                        Ban
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={-1} 
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Ban User Dialog */}
      <Dialog open={openBanDialog} onClose={handleCloseBanDialog}>
        <DialogTitle>Ban User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to ban {selectedUser?.fullName}? Please provide a reason for the ban:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason for ban"
            type="text"
            fullWidth
            variant="outlined"
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBanDialog}>Cancel</Button>
          <Button 
            onClick={handleBanUser} 
            color="error" 
            disabled={!banReason.trim() || loading.banUser}
          >
            {loading.banUser ? <CircularProgress size={24} /> : 'Ban User'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unban User Dialog */}
      <Dialog open={openUnbanDialog} onClose={handleCloseUnbanDialog}>
        <DialogTitle>Unban User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to unban {selectedUser?.fullName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUnbanDialog}>Cancel</Button>
          <Button 
            onClick={handleUnbanUser} 
            color="success"
            disabled={loading.unbanUser}
          >
            {loading.unbanUser ? <CircularProgress size={24} /> : 'Unban User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;