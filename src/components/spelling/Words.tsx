import { Box, Slider, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Word from '~/components/spelling/Word';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Finished from '../infoPages/Finished';

const Words = ({
  deck,
  deckName,
  volumne,
  setVolumne,
}: {
  deck: any;
  deckName: string;
  volumne: any;
  setVolumne: any;
}) => {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [word, setWord] = useState(deck[index]);

  const nextWord = () => {
    if (index === deck.length - 1) {
      setCompleted(true);
    } else {
      const idx = index;
      setIndex(idx + 1);
      setWord(deck[idx + 1]);
    }
  };
  const previousWord = () => {
    if (index !== 0) {
      const idx = index;
      setIndex(idx - 1);
      setWord(deck[idx - 1]);
    }
  };

  const keyCheck = (e: any) => {
    const key = e.key;
    switch (key) {
      case 'ArrowRight':
        nextWord();
        break;
      case 'ArrowLeft':
        previousWord();
        break;
    }
  };

  console.log(errorCount);

  document.onkeydown = keyCheck;

  return !completed ? (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="space-between"
      width="100%"
    >
      <Word
        word={word}
        next={nextWord}
        volumne={volumne}
        setErrorCount={setErrorCount}
      />
      <Box
        sx={{
          height: '50px',
          width: '100%',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          justifySelf: 'flex-end',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 2rem',
        }}
      >
        <Typography>{deckName}</Typography>
        <Stack
          spacing={2}
          direction="row"
          sx={{ width: '300px' }}
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
        <div style={{ display: 'flex' }}>
          {index !== 0 && (
            <ArrowLeftIcon onClick={previousWord} sx={{ cursor: 'pointer' }} />
          )}
          <Typography>{index + 1 + ' - ' + deck.length}</Typography>
          {index !== deck.length - 1 && (
            <ArrowRightIcon onClick={nextWord} sx={{ cursor: 'pointer' }} />
          )}
        </div>
      </Box>
    </Box>
  ) : (
    <Finished />
  );
};

export default Words;
