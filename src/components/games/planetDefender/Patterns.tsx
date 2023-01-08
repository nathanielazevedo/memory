import React, { useEffect, useState } from 'react';
import bg from './bg.webp';
import { useAtom } from 'jotai';
import ld from 'lodash';
import { deckAtom, tabAtom } from '../../State';
import Ball from './Ball';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

export const colors = {
  purple: '#7a04eb ',
  pink: '#ff00a0',
  dPurple: '#120458',
  red: '#860029',
};

const Patterns = () => {
  const deck = useAtom(deckAtom)[0];
  const [text, setText] = useState('');
  const setTab = useAtom(tabAtom)[1];
  const [showDialog, setShowDialog] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [playing, setPlaying] = useState<boolean>(false);
  const [showMenuDialog, setShowMenuDialog] = useState(true);
  const [playDeck, setPlayDeck] = useState(ld.cloneDeep(deck));
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const wordInfo = playDeck[0];

  const handleWrong = () => {
    setPlaying(false);
    setText('');

    // remove and append wrong word
    const wrong = playDeck.shift();
    setPlayDeck((o: any) => [...o, wrong]);
    setTimeout(() => {
      setPlaying(true);
    }, 500);
  };

  const handleChange = (text: string) => {
    // word is right
    if (text === wordInfo?.known) {
      setPlaying(false);

      setPlayDeck((o: any) => {
        o.shift();
        // game is won
        if (o.length == 0) {
          setShowDialog(true);
          const sound = new Audio('./win.wav');
          sound.volume = 0.1;
          sound.play();
          return [];
        } else {
          // got the word right, but game is not over
          const sound = new Audio('./good.wav');
          sound.volume = 0.1;
          sound.play();

          setText('');
          setTimeout(() => {
            setPlaying(true);
          }, 500);
        }
        return [...o];
      });
    } else setText(text);
  };

  // really starts game
  const start = () => {
    setPlaying(false);
    setShowMenuDialog(false);
    setTimeout(() => {
      setPlaying(true);
      setText('');
    }, 500);
  };

  // sets countdown
  const prepareGame = () => {
    const sound = new Audio('./countdown.wav');
    sound.volume = 0.3;
    sound.play();
    setText('');
    setTimer(3);
    setPlayDeck(ld.cloneDeep(deck));
    let count = 3;
    const time = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(time);
        start();
        setTimer(undefined);
      } else setTimer((o) => (o && o > 0 ? o - 1 : undefined));
    }, 1000);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: `url(${bg.src}) no-repeat center center fixed`,
        height: '100vh',
        backgroundSize: 'cover',
        width: '100vw',
      }}
    >
      {timer ? <div className="timer">{timer}</div> : null}
      <CloseRoundedIcon
        onClick={() => {
          setShowMenuDialog(true);
          setPlaying(false);
        }}
        sx={{
          fontSize: '75px',
          color: 'white',
          position: 'absolute',
          left: '20px',
          cursor: 'pointer',
        }}
      />
      {playing && (
        <Ball
          text={playDeck && playDeck[0]}
          handleWrong={handleWrong}
          difficulty={difficulty}
        />
      )}
      <div className="planet" />
      <TextField
        onChange={(evt) => handleChange(evt.target.value)}
        value={text}
        sx={{
          position: 'absolute',
          bottom: 100,
          backgroundColor: 'black',
          border: 'solid #04a2fc 1px',
          borderRadius: '5px',
          width: '500px',
          textAlign: 'center',
        }}
      />
      {showDialog && (
        <Dialog open>
          <DialogTitle>You won!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You so smart!
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{ display: 'flext', justifyContent: 'space-between' }}
          >
            <Button
              onClick={() => {
                setShowDialog(false);
                setShowMenuDialog(true);
              }}
            >
              Menu
            </Button>
            <Button
              onClick={() => {
                setShowDialog(false);
                prepareGame();
              }}
            >
              Play Again
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showMenuDialog && (
        <Dialog
          open
          fullWidth
          PaperProps={{ sx: { height: '500px', backgroundColor: 'black' } }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            Menu
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Translate the word before the comet hits the planet!
            </DialogContentText>
            <FormControl sx={{ marginTop: '35px' }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Difficulty
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={difficulty}
              >
                <FormControlLabel
                  value="easy"
                  control={<Radio />}
                  label="Easy"
                  onClick={() => setDifficulty('easy')}
                />
                <FormControlLabel
                  value="hard"
                  control={<Radio />}
                  label="Hard"
                  onClick={() => setDifficulty('hard')}
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions
            sx={{ display: 'flext', justifyContent: 'space-between' }}
          >
            <Button onClick={() => setTab('game')}>Leave Game</Button>
            <Button
              onClick={() => {
                setShowMenuDialog(false);
                prepareGame();
              }}
            >
              Start
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Patterns;

/* 
  don't mess with original array
  1. deep clone array and create a new one
  2. if wrong - append to this array
  3. if right - remove from this array
  4. start new game by cloning original array 
*/
