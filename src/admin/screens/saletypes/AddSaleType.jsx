import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";


const AddSaleTypeDialog = ({ open, handleClose, onSubmit }) => {
  const [saleTypeName, setSaleTypeName] = useState("");

  const baseUrl = import.meta.env.VITE_APP_URL
  const handleSubmit = async (event) => {
    event.preventDefault();
   
    const newSaleType = {
      name: saleTypeName,
    };

    console.log(newSaleType)

    try {
      
      const response = await axios.post(`${baseUrl}/api/sale_types/`, newSaleType);

      
      console.log(response.data);

   
      setSaleTypeName("");

     
      onSubmit();

    
      handleClose();
    } catch (error) {
     
      console.error("Error adding sale type:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Sale Type</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Sale Type Name"
            type="text"
            fullWidth
            variant="standard"
            value={saleTypeName}
            onChange={(e) => setSaleTypeName(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSaleTypeDialog