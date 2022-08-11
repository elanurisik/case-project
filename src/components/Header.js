import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = window.localStorage.getItem("token");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#001D6E" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panel
          </Typography>
          {auth && (
            <Button
              onClick={() => {
                navigate("/");
                window.localStorage.clear();
              }}
              sx={{ backgroundColor: "#001D6E", color: "white" }}
            >
              Çıkış yap
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
