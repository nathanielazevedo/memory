import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  TableRow,
  TableCell,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const Row = ({
  word,
  deleteWord,
  editWord,
}: {
  word: any;
  deleteWord: any;
  editWord: any;
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setEdit] = React.useState(false);
  const [wordState, setWordState] = React.useState(word);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sayWord = (word: string) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = word;
    msg.lang = 'zh';
    msg.rate = 0.5;
    window.speechSynthesis.speak(msg);
  };

  return (
    <TableRow key={word.learning} sx={{ justifyContent: 'center' }}>
      <TableCell align="center" sx={{ borderBottomWidth: '0.01px' }}>
        <Typography
          variant="h6"
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            borderBottomWidth: '0.01px',
          }}
        >
          <MoreVertIcon />
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        sx={{ borderBottomWidth: '0.01px', minWidth: '300px' }}
      >
        {edit ? (
          <TextField
            value={wordState.known}
            variant="standard"
            onChange={(evt) => {
              setWordState((old: any) => {
                old.known = evt.target.value;
                return { ...old };
              });
            }}
          />
        ) : (
          <Typography variant="h6">{word.known}</Typography>
        )}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          cursor: 'pointer',
          borderBottomWidth: '0.01px',
          minWidth: '300px',
        }}
        onClick={() => (edit ? null : sayWord(word?.learning))}
      >
        {edit ? (
          <TextField
            value={wordState.learning}
            variant="standard"
            onChange={(evt) => {
              setWordState((old: any) => {
                old.learning = evt.target.value;
                return { ...old };
              });
            }}
          />
        ) : (
          <Typography variant="h6">{word.learning}</Typography>
        )}
      </TableCell>
      {edit ? (
        <TableCell sx={{ cursor: 'pointer', borderBottomWidth: '0.01px' }}>
          <Button
            onClick={() => {
              editWord(wordState);
              setEdit(false);
            }}
          >
            Save
          </Button>
        </TableCell>
      ) : (
        <TableCell sx={{ cursor: 'pointer', borderBottomWidth: '0.01px' }} />
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setEdit(true);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={deleteWord}>Delete</MenuItem>
      </Menu>
    </TableRow>
  );
};

export default Row;
