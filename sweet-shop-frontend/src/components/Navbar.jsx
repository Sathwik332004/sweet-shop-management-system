import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

// ===== Search styling =====
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 12,
  backgroundColor: alpha("#1e1e1e", 0.8),
  "&:hover": { backgroundColor: alpha("#1e1e1e", 0.95) },
  width: "100%",
  transition: "all 0.2s ease-in-out",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#669928",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#fff",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": { width: "25ch" },
    },
  },
}));

// ===== Navbar Component =====
export default function Navbar({ onSearch, onMenuClick }) {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "rgba(11, 18, 24, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: 1201,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: isMobile ? 2 : 4,
          py: 1,
          minHeight: 64,
          gap: 2,
        }}
      >
        {/* 🍔 Hamburger (only for mobile) */}
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
            sx={{
              mr: 1,
              color: "#669928",
              flexShrink: 0,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* 🍭 Logo */}
        <Typography
          variant={isMobile ? "h6" : "h5"}
          noWrap
          sx={{
            fontWeight: "bold",
            color: "#669928",
            letterSpacing: "0.5px",
            flexShrink: 0,
          }}
        >
          🍭 SweetShop
        </Typography>

        {/* 🔍 Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            maxWidth: isMobile ? "65%" : "400px",
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search sweets..."
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => onSearch(e.target.value)}
            />
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
