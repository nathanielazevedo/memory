import React from "react";
import { Box, Slider, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        height: "50px",
        width: "100%",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
        justifySelf: "flex-end",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 2rem",
      }}
    >
      {/* <Typography>{deckName}</Typography>
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: "300px" }}
        alignItems="center"
      >
        <Slider
          aria-label="Volume"
          value={volumne as number}
          onChange={(event: Event, newValue: number | number[]) =>
            setVolumne(newValue)
          }
          color="secondary"
          min={0.5}
          max={2}
          step={0.1}
        />
      </Stack>
      <div style={{ display: "flex" }}>
        {index !== 0 && (
          <ArrowLeftIcon onClick={previousWord} sx={{ cursor: "pointer" }} />
        )}
        <Typography>{index + 1 + " - " + deck.length}</Typography>
        {index !== deck.length - 1 && (
          <ArrowRightIcon onClick={nextWord} sx={{ cursor: "pointer" }} />
        )}
      </div> */}
    </Box>
  );
};

export default Footer;
