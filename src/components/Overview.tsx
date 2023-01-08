import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';
import { deckAtom } from './State';
import { useAtom } from 'jotai';
import { trpc } from '~/utils/trpc';
import Row from './Dropdown';

type Word = {
  learning: string;
  known: string;
};

type WordW = {
  id: string;
  learning: string;
  known: string;
};

const Overview = () => {
  const [newRows, setNewRows] = React.useState<Word[]>([]);
  const utils = trpc.useContext();

  const [deck] = useAtom(deckAtom);

  const addRow = () => {
    setNewRows((o: any) => {
      return [...o, { known: '', learning: '' }];
    });
  };

  const mutation = trpc.words.add.useMutation({
    async onSuccess() {
      await utils.words.list.invalidate();
    },
  });

  const deleteMutation = trpc.words.delete.useMutation({
    async onSuccess() {
      await utils.words.list.invalidate();
    },
  });

  const editMutation = trpc.words.edit.useMutation({
    async onSuccess() {
      await utils.words.list.invalidate();
    },
  });

  const submitRows = () => {
    if (newRows.length > 0 && newRows) {
      mutation.mutate(newRows);
      setNewRows([]);
    }
  };

  const deleteWord = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const editWord = (data: WordW) => {
    editMutation.mutate(data);
  };

  return (
    <>
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
              <TableCell
                align="center"
                sx={{ borderBottomWidth: '0.01px', width: '50px' }}
              >
                <Typography variant="h6"></Typography>
              </TableCell>
              <TableCell align="left" sx={{ borderBottomWidth: '0.01px' }}>
                <Typography variant="h6">Known</Typography>
              </TableCell>
              <TableCell align="left" sx={{ borderBottomWidth: '0.01px' }}>
                <Typography variant="h6">Learning</Typography>
              </TableCell>
              <TableCell
                align="left"
                sx={{ borderBottomWidth: '0.01px' }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deck &&
              deck?.map((word: Record<any, any>) => (
                <Row
                  key={word.id}
                  word={word}
                  deleteWord={() => deleteWord(word.id)}
                  editWord={editWord}
                />
              ))}
            {newRows.map((word: Record<any, any>, i) => (
              <TableRow key={i}>
                <TableCell
                  align="left"
                  sx={{ borderBottomWidth: '0.01px' }}
                ></TableCell>
                <TableCell
                  align="left"
                  sx={{ borderBottomWidth: '0.01px', minWidth: '300px' }}
                >
                  <TextField
                    variant="standard"
                    onChange={(evt) => {
                      setNewRows((old) => {
                        const valCheck = old[i];
                        if (valCheck) valCheck.known = evt.target.value;

                        return [...old];
                      });
                    }}
                  >
                    {word.learning}
                  </TextField>
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ borderBottomWidth: '0.01px', minWidth: '300px' }}
                >
                  <TextField
                    variant="standard"
                    onChange={(evt) => {
                      setNewRows((old) => {
                        const valCheck = old[i];
                        if (valCheck) valCheck.learning = evt.target.value;
                        return [...old];
                      });
                    }}
                  >
                    {word.learning}
                  </TextField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={addRow}
            sx={{ marginRight: '20px', marginTop: '50px' }}
          >
            Add Row
          </Button>
          {newRows.length ? (
            <>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setNewRows([]);
                }}
                sx={{ marginRight: '20px', marginTop: '50px' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={submitRows}
                sx={{ marginTop: '50px' }}
              >
                Save Changes
              </Button>
            </>
          ) : null}
        </div>
      </TableContainer>
    </>
  );
};

export default Overview;
