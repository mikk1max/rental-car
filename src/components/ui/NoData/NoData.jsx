import React from "react";
import { Box, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export default function NoData({ message = "No results found." }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      color="text.secondary"
      textAlign="center"
      gap={1}
    >
      <ErrorOutlineIcon sx={{ fontSize: 40, color: "text.disabled" }} />
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}
