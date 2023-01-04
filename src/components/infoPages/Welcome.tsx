import React from "react";
import { Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";

const Welcome = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" color="lightblue">
        Game based approach to learning.
      </Typography>
      <Typography variant="h5" pt="3rem">
        Choose a deck from the left panel to get started
      </Typography>
    </div>
  );
};

export default Welcome;
