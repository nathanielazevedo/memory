import { Box } from '@mui/material';
import React from 'react';
import { tabAtom } from '../../State';
import { useAtom } from 'jotai';

const Main = () => {
  const [tab, setTab] = useAtom(tabAtom);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="border"
        onClick={() => setTab('planet')}
        style={{
          background: 'linear-gradient(to right, red, purple',
          padding: '3px',
          height: '75px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            alignItems: 'center',
            width: '500px',
            height: '100%',
            borderRadius: '5px',
            marginBottom: '50px',
            padding: '3px',
          }}
        >
          Planet Defender
        </Box>
      </div>
      <div
        className="border"
        style={{
          background: 'linear-gradient(to right, red, purple',
          padding: '3px',
          height: '75px',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            alignItems: 'center',
            width: '500px',
            height: '100%',
            borderRadius: '5px',
            padding: '3px',
          }}
        >
          Sound Scape
        </Box>
      </div>
    </div>
  );
};

export default Main;
