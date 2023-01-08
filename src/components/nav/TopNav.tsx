import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAtom } from 'jotai';
import { sideNavState } from '../State';
import { deckAtom, tabAtom } from '../State';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const TopNav = ({ backToHome }: { backToHome: () => void }) => {
  const [deck, setDeck] = useAtom(deckAtom);
  const setSideNav = useAtom(sideNavState)[1];
  const [tab, setTab] = useAtom(tabAtom);
  return tab !== 'planet' ? (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        position: 'aboslute',
        top: 0,
        height: '70px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '0 25px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        minWidth: '100vw',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MenuIcon
          onClick={() => setSideNav(true)}
          sx={{ cursor: 'pointer', color: 'rgb(255, 255, 255, 0.7)' }}
        />
        {tab && (
          <div
            style={{
              display: 'flex',
              justifySelf: 'flex-start',
              marginLeft: '20px',
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ cursor: 'pointer', color: 'rgb(255, 255, 255, 0.7)' }}
              mr="20px"
              onClick={() => setTab('overview')}
            >
              Overview
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ cursor: 'pointer', color: 'rgb(255, 255, 255, 0.7)' }}
              onClick={() => setTab('spelling')}
              mr="20px"
            >
              Spelling
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ cursor: 'pointer', color: 'rgb(255, 255, 255, 0.7)' }}
              onClick={() => setTab('game')}
              mr="20px"
            >
              Games
            </Typography>
          </div>
        )}
      </div>
      <VideogameAssetIcon
        sx={{ cursor: 'pointer' }}
        fontSize="large"
        onClick={backToHome}
      />
    </AppBar>
  ) : null;
};

export default TopNav;
