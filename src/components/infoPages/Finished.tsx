import { Typography } from "@mui/material";
import React from "react";

function Finished() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10rem",
      }}
    >
      <Typography variant="h2" color="lightblue">
        Great job!
      </Typography>
      <Typography variant="h5" pt="3rem">
        Choose another deck!
      </Typography>
    </div>
  );
}

export default Finished;
