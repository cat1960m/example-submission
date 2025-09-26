import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useComment } from "../hooks/useComment";
import { useParams } from "react-router-dom";

export const ModalAddComment = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { addComment, isPending } = useComment();
  const blogId = useParams().id;

  useEffect(() => {
    if (isPending) {
      console.log("Add comment is pending");
    }
  }, [isPending]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOK = () => {
    addComment(blogId, value);
    setOpen(false);
    setValue("");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add comment</Button>
      {open ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-title" variant="h6" component="h2">
              Add comment
            </Typography>
            <TextField
              label="New comment"
              variant="outlined"
              onChange={handleChange}
              value={value}
              style={{ width: "100%" }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleOK}>OK</Button>
            </div>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
};
