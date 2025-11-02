import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSweets, updateSweet } from "../api/sweets";
import SweetForm from "../components/SweetForm";
import { Container, Typography, CircularProgress } from "@mui/material";

const EditSweetPage = () => {
  const { id } = useParams(); // get sweet ID from URL
  const navigate = useNavigate();

  const [sweet, setSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch sweet details on load
  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const res = await getSweets();
        const found = res.data.find((s) => s.id === id);
        if (found) setSweet(found);
      } catch (err) {
        console.error("Error loading sweet", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSweet();
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    setSweet({ ...sweet, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSweet(id, sweet);
      alert("Sweet updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed", err);
      alert("Error updating sweet. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Sweet
      </Typography>
      <SweetForm
        sweet={sweet}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={saving}
      />
    </Container>
  );
};

export default EditSweetPage;
