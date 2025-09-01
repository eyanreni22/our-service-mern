import { Button, Table, TableBody, TableCell, TableContainer, Typography, TableHead, TableRow, Paper } from "@mui/material";
import { toggleUserStatusAction, deleteUserAction } from "../redux/Slices/adminSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

const UserManagement = ({ users }) => {
  const dispatch = useDispatch();

  const handleToggleStatus = (id) => {
    dispatch(toggleUserStatusAction(id));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAction(id));
  };

  return (
    <div className="user-management">
      <Typography variant="h6">User Management</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleToggleStatus(user._id)}
                  >
                    Toggle Status
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// ✅ Add prop validation
UserManagement.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default UserManagement;
