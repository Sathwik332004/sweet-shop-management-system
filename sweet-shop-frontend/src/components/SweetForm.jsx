import React from "react";
import { TextField, Button, Box } from "@mui/material";

const SweetForm = ({ sweet, onChange, onSubmit, isSubmitting }) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <TextField
        label="Name"
        name="name"
        value={sweet.name}
        onChange={onChange}
        required
      />
      <TextField
        label="Category"
        name="category"
        value={sweet.category}
        onChange={onChange}
        required
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={sweet.price}
        onChange={onChange}
        required
      />
      <TextField
        label="Quantity"
        name="quantity"
        type="number"
        value={sweet.quantity}
        onChange={onChange}
        required
      />
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
    </Box>
  );
};

export default SweetForm;
