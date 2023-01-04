import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ChooseUser = ({ setUser }: { setUser: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxWidth: "100vw",
      }}
    >
      <Typography variant="h2">Who are you?</Typography>
      <div style={{ marginTop: "50px" }}>
        <Button
          variant="outlined"
          onClick={() => setUser("liyuan")}
          sx={{ padding: "50px", marginRight: "50px", width: "200px" }}
        >
          Liyuan
        </Button>
        <Button
          variant="outlined"
          onClick={() => setUser("nate")}
          sx={{ padding: "50px", width: "200px" }}
        >
          Nate
        </Button>
      </div>
    </Box>
  );
};

export default ChooseUser;
