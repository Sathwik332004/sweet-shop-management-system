import { useEffect, useState } from "react";
import { getSweets, purchase } from "../api/sweets";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";

export default function DashboardPage({ searchQuery }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = async () => {
    setLoading(true);
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch {
      toast.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (id) => {
    try {
      await purchase(id, 1);
      toast.success("Sweet purchased successfully!");
      loadSweets();
    } catch (err) {
      toast.error("Purchase failed — maybe out of stock?");
      console.error(err);
    }
  };

  const filtered = sweets.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 8, color: "#ccc" }}>
        Loading sweets...
      </Box>
    );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        🍬 Available Sweets
      </Typography>

      <Grid container spacing={3}>
        {filtered.length > 0 ? (
          filtered.map((sweet) => (
            <Grid item xs={12} sm={6} md={4} key={sweet.id}>
              <Card
                sx={{
                  background:
                    "linear-gradient(145deg, rgba(18,27,31,0.95), rgba(11,18,24,0.95))",
                  color: "#fff",
                  border: "1px solid rgba(102,153,40,0.3)",
                  borderRadius: "16px",
                  boxShadow: "0 0 10px rgba(102,153,40,0.15)",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#669928" }}>
                    {sweet.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {sweet.category}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    ₹{sweet.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      color: sweet.quantity > 0 ? "#9ccc65" : "#e57373",
                    }}
                  >
                    Stock: {sweet.quantity}
                  </Typography>

                  {/* ✅ Only show Buy button for normal users */}
                  {user?.role === "USER" && (
                    <Button
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor:
                          sweet.quantity > 0 ? "#669928" : "#555",
                        color: "white",
                        "&:hover": {
                          backgroundColor:
                            sweet.quantity > 0 ? "#5a8822" : "#666",
                        },
                      }}
                      disabled={sweet.quantity === 0}
                      onClick={() => handleBuy(sweet.id)}
                    >
                      {sweet.quantity > 0 ? "Buy Now" : "Out of Stock"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography sx={{ color: "#aaa", textAlign: "center", mt: 4, w: "100%" }}>
            No sweets found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
