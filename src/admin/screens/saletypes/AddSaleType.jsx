import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {toast, ToastContainer } from "react-toastify";

const AddSaleTypeDialog = ({ open, handleClose, editSaleType }) => {
  const [saleTypeName, setSaleTypeName] = useState("");
  useEffect(()=> {
    setSaleTypeName(editSaleType?.name)
  },[editSaleType])
 
  const baseUrl = import.meta.env.VITE_APP_URL;
  const handleSubmit = async (event) => {
  event.preventDefault();
  const newSaleType = { name: saleTypeName, visible: true };

  try {
    if (editSaleType) {
      // Edit existing sale type
      await axios.put(`${baseUrl}/api/update_sale_type/${editSaleType.sale_type_id}/`, newSaleType);
      toast.success("Sale type updated successfully");
    } else {
      // Add new sale type
      await axios.post(`${baseUrl}/api/sale_types/`, newSaleType);
      toast.success("Sale type added successfully");
    }

   
    setTimeout(() => {
      setSaleTypeName("");
      handleClose();
    }, 1000);
  } catch (error) {
    console.error("Error adding/updating sale type:", error.response.data || error);
    toast.error(
      error.response?.data?.detail || "Failed to add/update sale type"
    );
  }
};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editSaleType ? "Edit Sale Type" : "Add Sale Type"}</DialogTitle>
      <DialogContent>
        <ToastContainer/>
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
          {editSaleType ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSaleTypeDialog;
