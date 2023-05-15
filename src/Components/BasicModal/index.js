import React from "react";
import { Modal, Typography } from "@mui/material";

function CustomModal(props) {
  const handleClose = () => {
    props.onClose(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
    height: "250px",
    borderRadius: "6px",
    backgroundColor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <div style={style}>
        <Typography
          variant="h5"
          style={{
            justifyContent: "center",
            display: "flex",
            fontWeight: "bold",
          }}
        >
          {props.heading}
        </Typography>
        {props.children}
      </div>
    </Modal>
  );
}

export default CustomModal;
