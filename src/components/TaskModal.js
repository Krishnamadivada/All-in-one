import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import NewTaskForm from "./NewTaskForm";

const TaskModal = ({
  open,
  onClose,
  onTaskCreated,
  editingTask,
  onTaskEdited,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
      <DialogContent>
        <NewTaskForm
          onTaskCreated={onTaskCreated}
          task={editingTask}
          onTaskEdited={onTaskEdited}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
