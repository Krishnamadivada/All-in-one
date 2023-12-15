import {
  Typography,
  CssBaseline,
  Box,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardActions,
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
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
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
    fetchTasks();
  }, []);

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
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {tasks.map((task, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: "0px 0px 8px 4px  rgba(0,0,0,0.1)", 
                borderRadius: "10px",
                // backgroundColor: "#95E1FD", 
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CardContent sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Typography variant="h6" fontWeight='bold'>{task.name}</Typography>
                <Typography variant="body1" color="text.secondary" mt={1}>
                  {task.description}
                </Typography>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: 10, gap: 20}}>
                  <div>
                <span style={{display: 'flex', alignItems: 'center'}}>
                  Start Date <CalendarMonthIcon color="primary" fontSize="small"/> : 
                </span>
                <span style={{fontSize: 12}}>{task.startDate}</span>
                </div>
                <div>
                <span style={{display: 'flex', alignItems: 'center'}}>
                  End Date <CalendarMonthIcon color="primary" fontSize="small"/>: 
                </span>
                <span style={{fontSize: 12}}>{task.endDate}</span>
                </div>
                </div>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleTaskEdit(task)}
                  sx={{backgroundColor: '#fff', boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)"}}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleTaskDelete(task.id)}
                  sx={{backgroundColor: '#fff', boxShadow: "0 0 4px 4px  rgba(0,0,0,0.1)"}}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
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
        ) : (
          <TaskList
            tasks={filteredTasks}
            handleTaskEdit={handleTaskEdit}
            handleTaskDelete={handleTaskDelete}
          />
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
