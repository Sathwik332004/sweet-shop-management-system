import React, { useState } from "react";
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText,
  IconButton, Box, Divider, Typography, useMediaQuery
} from "@mui/material";
import {
  Menu as MenuIcon, Dashboard, AdminPanelSettings, Logout, Close
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const DRAWER_WIDTH = 240; 

export default function Sidebar({ onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:900px)");

  const toggle = () => setMobileOpen((v) => !v);

  const drawerContent = (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        height: "100%",
        background: "rgba(11,18,24,0.95)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 0 20px rgba(102,153,40,0.25)",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 2 }}>
          {isMobile && (
            <IconButton onClick={toggle} sx={{ color: "#fff" }}>
              <Close />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

        <List>
          <ListItem
            button component={Link} to="/"
            selected={location.pathname === "/"}
            onClick={() => setMobileOpen(false)}
            sx={{ "&.Mui-selected": { backgroundColor: "rgba(102,153,40,0.18)", borderLeft: "4px solid #669928" } }}
          >
            <ListItemIcon sx={{ color: "#669928" }}><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            button component={Link} to="/admin"
            selected={location.pathname === "/admin"}
            onClick={() => setMobileOpen(false)}
            sx={{ "&.Mui-selected": { backgroundColor: "rgba(102,153,40,0.18)", borderLeft: "4px solid #669928" } }}
          >
            <ListItemIcon sx={{ color: "#669928" }}><AdminPanelSettings /></ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
        <List>
          <ListItem button onClick={onLogout}>
            <ListItemIcon sx={{ color: "#ff6b6b" }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* ☰ mobile toggle button (stays above everything) */}
      {isMobile && (
        <IconButton
          onClick={toggle}
          sx={{
            position: "fixed", top: 14, left: 14, zIndex: 2500,
            background: "rgba(11,18,24,0.85)", borderRadius: "10px",
            "&:hover": { background: "rgba(11,18,24,1)" }
          }}
        >
          <MenuIcon sx={{ color: "#669928" }} />
        </IconButton>
      )}

      {/* 🖥️ permanent drawer (desktop) — starts below AppBar */}
      <Drawer
        variant="permanent"
        open={!isMobile}
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            top: 64,                               // <-- below AppBar
            height: "calc(100% - 64px)",           // <-- stops at bottom
            background: "linear-gradient(180deg, #0b1218 0%, #121b1f 100%)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 📱 temporary drawer (mobile) — overlays */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={toggle}
        ModalProps={{ keepMounted: true }}
        transitionDuration={320}
        sx={{
          display: { xs: "block", md: "none" },
          zIndex: 2200,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            background: "rgba(11,18,24,0.95)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export { DRAWER_WIDTH };
