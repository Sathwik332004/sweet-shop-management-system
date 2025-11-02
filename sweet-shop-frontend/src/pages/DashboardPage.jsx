import { useEffect, useState } from "react";
import { getSweets, searchSweets } from "../api/sweets";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

export default function DashboardPage({ searchQuery }) {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSweets = async (query) => {
    setLoading(true);
    try {
      const res = query
        ? await searchSweets({ name: query })
        : await getSweets();
      setSweets(res.data);
    } catch {
      console.error("Failed to load sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadSweets(searchQuery);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (loading)
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress color="success" />
      </Box>
    );

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#669928",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Sweet Dashboard 🍬
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {sweets.length === 0 ? (
          <Typography variant="body1" color="gray">
            No sweets found.
          </Typography>
        ) : (
          sweets.map((s) => (
            <Grid
              item
              key={s.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  width: "100%",
                  flexGrow: 1,
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  backdropFilter: "blur(6px)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(102,153,40,0.4)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {s.name}
                  </Typography>
                  <Typography variant="body2" color="#bbb">
                    {s.category}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      ₹{s.price}
                    </Typography>
                    <Typography variant="body2" color="#aaa">
                      Stock: {s.quantity}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
