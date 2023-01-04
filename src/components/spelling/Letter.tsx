import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { LinearProgress } from '@mui/material';
const Input = ({
  letter,
  index,
  refs,
  next,
  setErrorCount,
}: {
  letter: string;
  index: number;
  refs: any;
  next: any;
  setErrorCount: any;
}) => {
  const [letterState, setLetterState] = useState<string>();
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [borderColor, setBorderColor] = useState<string>('white');

  useEffect(() => {
    return () => {
      setLetterState('');
    };
  }, []);

  const specialCharacters = ['¯', '`', 'ˇ', '´'];
  const handleChange = (val: string) => {
    const special = specialCharacters.find((e) => e == val);
    if (val.length > 1) return;
    if (!!special) {
      setLetterState(val);
      return;
    }
    setLetterState(val);
    if (val.toLowerCase() === letter.toLowerCase()) {
      setBorderColor('lightgreen');
      if (index === refs?.length - 1) {
        setShowCheck(true);
        setTimeout(() => {
          next();
        }, 1500);
      } else {
        refs[index + 1].focus();
      }
    } else {
      setBorderColor('red');
      // setErrorCount((o) => o + 1);
    }
  };
  return (
    <>
      <input
        type="text"
        max="1"
        onChange={(evt) => handleChange(evt.target.value)}
        value={letterState}
        defaultValue={''}
        style={{
          width: '100px',
          height: '100px',
          margin: '0 10px',
          textAlign: 'center',
          fontSize: '55px',
          borderStyle: 'solid',
          borderWidth: '0.5px',
          borderColor: borderColor,
          outline: 'none',
          borderRadius: '5px',
          backgroundColor: '#1b1c1c',
        }}
      />
      {showCheck && (
        <CheckIcon
          sx={{ color: 'lightgreen', marginLeft: '50px', fontSize: '50px' }}
        />
      )}
    </>
  );
};

export default Input;
