import React, { useState } from "react";
import { TextField, Button, Grid, CircularProgress } from "@mui/material";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from 'react-redux';

const NewTaskForm = ({ onTaskCreated, task, onTaskEdited }) => {
  const [taskName, setTaskName] = useState(task ? task.name : "");
  const [taskDescription, setTaskDescription] = useState(
    task ? task.description : ""
  );
  const [startDate, setStartDate] = useState(task ? task.startDate : "");
  const [endDate, setEndDate] = useState(task ? task.endDate : "");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (task) {
      try {
        await updateDoc(doc(db, "tasks", task.id), {
          name: taskName,
          description: taskDescription,
          startDate: startDate,
          endDate: endDate,
          userId: user?.uid
        });
        setIsLoading(false);
        onTaskEdited({
          ...task,

          name: taskName,
          description: taskDescription,
          startDate,
          endDate,
          userId: user?.uid
        });
      } catch (e) {
        console.error("Error updating document: ", e);
        setIsLoading(false);
      }
    } else {
      try {
        const docRef = await addDoc(collection(db, "tasks"), {
          name: taskName,
          description: taskDescription,
          startDate: startDate,
          endDate: endDate,
          userId: user?.uid
        });
        onTaskCreated({
          id: docRef.id,
          name: taskName,
          description: taskDescription,
          startDate,
          endDate,
          userId: user?.uid
        });
        setIsLoading(false);
      } catch (e) {
        console.error("Error adding document: ", e);
        setIsLoading(false);
      }
    }
    setTaskName("");
    setTaskDescription("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Task Name"
            variant="outlined"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Task Description"
            variant="outlined"
            multiline
            rows={4}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Starting Date"
            variant="outlined"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Ending Date"
            variant="outlined"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            {isLoading ? (
              <CircularProgress size={20} sx={{ color: "#fff", mr: 1 }} />
            ) : null}{" "}
            {task ? "Update Task" : "Create Task"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewTaskForm;
