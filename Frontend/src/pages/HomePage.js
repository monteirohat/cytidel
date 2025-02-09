// src/pages/HomePage.js
import React from "react";
import {
  Box,
  Divider,
  Link,
} from "@mui/material";

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1, p:3 }}>
      <h1>Welcome</h1>
      <Divider sx={{ mt: 2, mb: 3 }} />
      <Link target="_blank" href="https://github.com/monteirohat/cytidel">Github Code Challenge - André Monteiro</Link>
    </Box>
  );
}

export default HomePage;