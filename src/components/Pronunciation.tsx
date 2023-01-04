import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const Alphabet = ({ words }: any) => {
  const [index, setIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const word = words.map((e: any) => {
    return (
      <>
        <Typography variant="h1" key={e.word.pinyin} mb="50px">
          {e.word.pinyin}
        </Typography>
        <audio controls src={`http://www.meetmandarin.com${e.word.chinese}`} />
      </>
    );
  });

  const record = () => {
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks: BlobPart[] | undefined = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      });

      setTimeout(() => {
        mediaRecorder.stop();
        setRecording(false);
      }, 3000);
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      {word[index]}
      <Button
        variant="outlined"
        color={recording ? "error" : "primary"}
        onClick={() => record()}
        sx={{ width: "300px", marginTop: "20px" }}
      >
        Record
      </Button>
      <Box mt="20px">
        <Button onClick={() => setIndex((o) => (o - 1 >= 0 ? o - 1 : 0))}>
          Previous
        </Button>
        <Button onClick={() => setIndex((o) => o + 1)}>Next</Button>
      </Box>
    </Box>
  );
};

export default Alphabet;
