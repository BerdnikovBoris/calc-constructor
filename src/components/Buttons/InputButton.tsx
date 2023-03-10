import React from 'react';

interface InputButtonProps {
  onClick: (value: string) => void;
}

const InputButton = (props: InputButtonProps) => {
  const { onClick } = props;
  return (
    <div draggable={true}>
      <button onClick={() => onClick('7')}>7</button>
      <button onClick={() => onClick('8')}>8</button>
      <button onClick={() => onClick('9')}>9</button>
      <br />
      <button onClick={() => onClick('4')}>4</button>
      <button onClick={() => onClick('5')}>5</button>
      <button onClick={() => onClick('6')}>6</button>
      <br />
      <button onClick={() => onClick('1')}>1</button>
      <button onClick={() => onClick('2')}>2</button>
      <button onClick={() => onClick('3')}>3</button>
      <br />
      <button onClick={() => onClick('0')}>0</button>
      <button onClick={() => onClick('.')}>.</button>
    </div>
  );
};

export default InputButton;
