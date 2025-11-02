import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  restock,
  searchSweets,
} from "../api/sweets";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function AdminPage() {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [editForm, setEditForm] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const loadSweets = async (query) => {
    try {
      const res = query ? await searchSweets({ name: query }) : await getSweets();
      setSweets(res.data);
    } catch {
      console.error("Failed to load sweets");
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => loadSweets(searchQuery), 300);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newSweetName = form.name.trim();
    if (!newSweetName) {
      toast.error("Sweet name cannot be empty!");
      return;
    }
    const sweetExists = sweets.some(
      (sweet) => sweet.name.toLowerCase() === newSweetName.toLowerCase()
    );
    if (sweetExists) {
      toast.error(`Sweet "${newSweetName}" already exists! 🍬`);
      return;
    }
    try {
      await createSweet({
        ...form,
        price: +form.price,
        quantity: +form.quantity,
      });
      setForm({ name: "", category: "", price: "", quantity: "" });
      setOpen(false);
      loadSweets();
      toast.success("Sweet added successfully 🍬");
    } catch {
      toast.error("Failed to add sweet");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateSweet(editForm.id, {
        ...editForm,
        price: +editForm.price,
        quantity: +editForm.quantity,
      });
      setEditForm(null);
      loadSweets();
      toast.success("Sweet updated successfully 🎉");
    } catch {
      toast.error("Failed to update sweet");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSweet(id);
      loadSweets();
      toast.success("Sweet deleted 🗑️");
    } catch {
      toast.error("Failed to delete sweet ⚠️");
    }
  };

  return (
    <Box sx={{ color: "#fff" }}>
      {/* 🔝 Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#669928", letterSpacing: 0.5 }}
        >
          Sweet Shop Admin Dashboard 🍭
        </Typography>

        {/* 🔍 Search bar */}
        <TextField
          variant="outlined"
          placeholder="Search sweets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "250px", md: "300px" },
            input: { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.08)",
              "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
              "&:hover fieldset": { borderColor: "#669928" },
              "&.Mui-focused fieldset": { borderColor: "#669928" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#669928" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* ➕ Add Sweet button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: "#669928",
            "&:hover": { backgroundColor: "#557a1d" },
            fontWeight: "bold",
            borderRadius: 2,
          }}
        >
          Add Sweet
        </Button>
      </Box>

      {/* 📦 Sweet Cards Grid */}
      <Grid container spacing={2}>
        {sweets.map((s) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={s.id}>
            <Card
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                backdropFilter: "blur(6px)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 20px rgba(102,153,40,0.4)",
                },
              }}
            >
              <CardContent>
                {/* ✅ Sweet Name */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#669928",
                    mb: 0.5,
                    textTransform: "capitalize",
                  }}
                >
                  {s.name}
                </Typography>

                <Typography variant="body2" sx={{ color: "#bbb", mb: 1 }}>
                  {s.category}
                </Typography>

                {/* ✅ Sweet Price */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#669928",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  ₹{s.price}
                </Typography>

                <Typography variant="body2" color="#aaa">
                  Stock: {s.quantity}
                </Typography>

                {/* 🧰 Action Buttons */}
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <IconButton
                    color="success"
                    size="small"
                    onClick={() => setEditForm(s)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    size="small"
                    onClick={() =>
                      restock(s.id, 10)
                        .then(loadSweets)
                        .then(() => toast.success("Restocked 10 items 📦"))
                        .catch(() => toast.error("Failed to restock"))
                    }
                  >
                    <InventoryIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(s.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialogs unchanged */}
      {/* 🪄 Add Sweet Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Sweet</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleAdd}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth />
            <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} fullWidth />
            <TextField label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth />
            <TextField label="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} fullWidth />
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained" color="success">
                Add
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ✏️ Edit Sweet Dialog */}
      <Dialog open={!!editForm} onClose={() => setEditForm(null)}>
        <DialogTitle>Edit Sweet</DialogTitle>
        <DialogContent>
          {editForm && (
            <Box
              component="form"
              onSubmit={handleEdit}
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField label="Name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} fullWidth />
              <TextField label="Category" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} fullWidth />
              <TextField label="Price" type="number" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} fullWidth />
              <TextField label="Quantity" type="number" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} fullWidth />
              <DialogActions>
                <Button onClick={() => setEditForm(null)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
