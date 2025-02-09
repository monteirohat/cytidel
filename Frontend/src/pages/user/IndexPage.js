// src/pages/user/IndexPage.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  Button,
  
} from "@mui/material";

//Icons
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

//Components
import PageNavbar from "../../components/PageNavbar";
import GridSkeleton from "../../components/GridSkeleton";


//Services
import {
  getUsers,
} from "../../services/UserService";

//Contexts
import { useNotification } from "../../contexts/NotificationContext";

function UserPage() {
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const notification = useNotification();

  //Users
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        notification.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [notification]);


  let pageButtons = [];


  return (
    <div>
      <Box>
        <PageNavbar
          title="Users"
          icon={ChecklistRtlIcon}
          buttons={pageButtons}
        />
        <Box mt={2} mx={3}>
          {loading ? (
            <GridSkeleton />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default UserPage;
