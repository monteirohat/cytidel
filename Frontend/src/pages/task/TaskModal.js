import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Divider,
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stack,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const TaskModal = ({
  title,
  titleIcon,
  open,
  handleClose,
  handleSave,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(""); // This will be a string from the datetime-local input
  const [priority, setPriority] = useState("2"); // Default to "Medium"

  // Error state for validation
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  const onSave = () => {
    let valid = true;

    if (!taskTitle.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!taskDescription.trim()) {
      setDescriptionError("Description is required");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!dueDate) {
      setDueDateError("Due Date is required");
      valid = false;
    } else {
      setDueDateError("");
    }

    if (!valid) return;

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      dueDate, // Optionally, you might convert this string to a Date object if needed.
      idPriority: priority,
      idStatus: 1,
    };

    handleSave(newTask);

    setTaskTitle("");
    setTaskDescription("");
    setDueDate("");
    setPriority("2");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          width: 600,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h6">
          {titleIcon &&
            React.createElement(titleIcon, {
              sx: {
                mr: 1, // margin-right
                verticalAlign: "sub",
              },
            })}

          {title}
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Stack
          spacing={2}
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#3c5a7f",
            color: "#ffffff",
          }}
        >
          Priority
        </Stack>
        <Stack
          spacing={2}
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            bgcolor: "rgb(236 242 255)",
          }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <FormControlLabel value="1" control={<Radio />} label="Low" />
            <FormControlLabel value="2" control={<Radio />} label="Medium" />
            <FormControlLabel value="3" control={<Radio />} label="High" />
          </RadioGroup>
        </Stack>

        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          error={!!titleError}
          helperText={titleError}
        />

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          error={!!descriptionError}
          helperText={descriptionError}
        />

        <TextField
          fullWidth
          label="Due Date"
          type="datetime-local"
          InputLabelProps={{
            shrink: true, // Ensures the label stays above the input
          }}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          error={!!dueDateError}
          helperText={dueDateError}
        />

        <Divider sx={{ mt: 2, mb: 3 }} />

        {/* Close Button */}
        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
