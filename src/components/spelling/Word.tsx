import React, { useEffect, useRef, useState } from 'react';
import Input from '~/components/spelling/Letter';
import styles from '../../styles/Home.module.css';

const Word = ({
  word,
  next,
  volumne,
  setErrorCount,
}: {
  word: any;
  next: any;
  volumne: number;
  setErrorCount: any;
}) => {
  const [inputRefs, setInputRefs] = useState<any>(undefined);
  const text = word?.known;
  const textChinese = word?.learning;
  const textToArray = text?.split('');

  useEffect(() => {
    setInputRefs(document.getElementById('inputs'));
  }, []);

  const sayWord = () => {
    const msg = new SpeechSynthesisUtterance();
    msg.text = textChinese;
    msg.lang = 'zh';
    msg.rate = volumne;
    window.speechSynthesis.speak(msg);
  };

  const random = Math.random();

  return (
    <div style={{ padding: '10rem 0 0 5rem' }}>
      <p className={styles.description} onClick={sayWord}>
        {textChinese}
      </p>
      <div
        id="inputs"
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {inputRefs &&
          textToArray?.map((letter: string, i: number) => (
            <Input
              setErrorCount={setErrorCount}
              refs={inputRefs?.children}
              key={i + letter + random}
              letter={letter}
              next={next}
              index={i}
            />
          ))}
      </div>
    </div>
  );
};

export default Word;
