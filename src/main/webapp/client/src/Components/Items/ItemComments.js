import { Box, TextField, Typography } from "@material-ui/core";
import React from "react";

export const ItemComments = ({ item }) => {
  return (
    <Box style={{ margin: "3rem 0 0 4rem" }}>
      <Typography>
        <b>Comments</b>
      </Typography>
      <TextField
        rows={10}
        multiline
        label="Write something..."
        style={{
          width: "80%",
          marginTop: "2rem",
          backgroundColor: "#F3F3F3",
          borderRadius: "2%",
        }}
      />
    </Box>
  );
};
