import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { deckAtom } from './State';
import { useAtom } from 'jotai';

const Overview = ({ deck: decks }: { deck: any }) => {
  const sayWord = (word: string) => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = word;
    msg.lang = 'zh';
    msg.rate = 0.5;
    window.speechSynthesis.speak(msg);
  };

  const [deck] = useAtom(deckAtom);

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        padding: '100px 40px 0 40px',
        overflowY: 'scroll',
        height: '100vh',
        border: 'none',
        width: '100vw',
      }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ borderBottomWidth: '0.01px' }}>
              <Typography variant="h6">Known</Typography>
            </TableCell>
            <TableCell align="center" sx={{ borderBottomWidth: '0.01px' }}>
              <Typography variant="h6">Learning</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deck.map((word: Record<any, any>) => (
            <TableRow key={word.learning}>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer', borderBottomWidth: '0.01px' }}
                onClick={() => sayWord(word.learning)}
              >
                <Typography variant="h6">{word.learning}</Typography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottomWidth: '0.01px' }}>
                <Typography variant="h6">{word.known}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Overview;
