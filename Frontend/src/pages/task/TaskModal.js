import React, { useState, useEffect } from "react";
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
} from "@mui/material";

export const TaskModal = ({
  title,
  titleIcon,
  open,
  handleClose,
  handleSave,
  editMode,
  task,
}) => {
  // Error state for validation
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [dueDateError, setDueDateError] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    idPriority: 2,
    idStatus: 1,
  });

  useEffect(() => {
    if (editMode && task) {
      setFormData({
        id: task.id || null,
        title: task.title || "",
        description: task.description || "",
        // Convert dueDate if necessary to match the datetime-local format
        dueDate: task.dueDate ? task.dueDate.substring(0, 16) : "",
        idPriority: String(task.idPriority || "2"),
        idStatus: String(task.idStatus || "1"),
      });
    }
  }, [editMode, task]);

  const onSave = () => {
    let valid = true;

    if (!formData.title.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else {
      setTitleError("");
    }

    if (!formData.description.trim()) {
      setDescriptionError("Description is required");
      valid = false;
    } else {
      setDescriptionError("");
    }

    if (!formData.dueDate) {
      setDueDateError("Due Date is required");
      valid = false;
    } else {
      setDueDateError("");
    }

    if (!valid) return;

    handleSave(formData);

    clearFields();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearFields = () => {
    setFormData({
        id: null,
        title: "",
        description: "",
        dueDate: "",
        idPriority: 2,
        idStatus: 1,
      });
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
            name="idPriority"
            value={formData.idPriority}
            onChange={handleChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="Low" />
            <FormControlLabel value="2" control={<Radio />} label="Medium" />
            <FormControlLabel value="3" control={<Radio />} label="High" />
          </RadioGroup>
        </Stack>

        <TextField
          fullWidth
          label="Title"
          name="title"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={formData.title}
          onChange={handleChange}
          error={!!titleError}
          helperText={titleError}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={formData.description}
          onChange={handleChange}
          error={!!descriptionError}
          helperText={descriptionError}
        />

        <TextField
          fullWidth
          label="Due Date"
          name="dueDate"
          type="datetime-local"
          InputLabelProps={{
            shrink: true, // Ensures the label stays above the input
          }}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          value={formData.dueDate}
          onChange={handleChange}
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
