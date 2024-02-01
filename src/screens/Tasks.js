import {
  Typography,
  CssBaseline,
  Box,
  Toolbar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Snackbar,
  Alert,
  Slide,
  Skeleton,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskModal from "../components/TaskModal";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, getDocs, deleteDoc, doc, where, query } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from 'react-redux';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]); 
    setIsModalOpen(false); 
    setOpenSnackbar(true);
  };

  const handleTaskEdited = (editedTask) => {
    setUpdateMessage(true);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setIsModalOpen(false);
    setEditingTask(null);
    setOpenSnackbar(true);
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

      setOpenSnackbar(true);
      setDeleteMessage(true);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const fetchTasks = async (userId) => {
    try {
      const q = query(collection(db, "tasks"), where("userId", "==", userId));
      
      const querySnapshot = await getDocs(q);
      let tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      console.log("tasks", tasks);
      setTasks(tasks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
      fetchTasks(user?.uid);
  }, [user]);

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
    setDeleteMessage(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  const handleTaskEdit = (task) => {
    setEditingTask(task); 
    setIsModalOpen(true); 
  };

  const handleMessage = () => {
    let message = "";
    if (deleteMessage) {
      message = "Task Deleted successfully!";
    } else if (updateMessage) {
      message = "Task updated successfully!";
    } else {
      message = "Task created successfully!";
    }
    return message;
  };

  const TaskList = ({ tasks, handleTaskEdit, handleTaskDelete }) => {
    return (
      <TableContainer component={Paper} sx={{mt: 3}}>
        <Table aria-label="task table">
          <TableHead bgcolor='#F4F3FF'>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>S.no</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Name</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Description</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Start Date</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>End Date</TableCell>
              <TableCell sx={{fontWeight: 'bold'}}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell>
                  {task.name}
                </TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {task.startDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {task.endDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleTaskEdit(task)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleTaskDelete(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              TASKS
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleOpenModal}
              startIcon={<AddTaskIcon />}
            >
              Create Task
            </Button>
          </Grid>
        </Grid>

        {/* Open Modal Button */}
        <Grid container>
          <Grid item xs={12}>
            <TextField
              label="Search Tasks"
              variant="outlined"
              fullWidth
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Task Modal */}
        <TaskModal
          open={isModalOpen}
          onClose={handleCloseModal}
          editingTask={editingTask}
          onTaskCreated={handleTaskCreated}
          onTaskEdited={handleTaskEdited}
        />

        {/* List of Tasks */}

        {loading ? (
          <Box sx={{ mt: 3 }}>
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
            <Skeleton animation="wave" height={50} />
          </Box>
        ) : tasks.length > 0 ? (
          <TaskList
            tasks={filteredTasks}
            handleTaskEdit={handleTaskEdit}
            handleTaskDelete={handleTaskDelete}
          />
        ) : (
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%'}}>
            <Typography variant="h6">
              No Tasks Found! Start Creating..
            </Typography>
          </Box>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          TransitionComponent={TransitionLeft}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success">{handleMessage()}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Tasks;
