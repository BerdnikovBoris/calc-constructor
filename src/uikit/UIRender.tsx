import React, { useState } from 'react';
import EqualButton from '../components/Buttons/EqualButton';
import InputButton from '../components/Buttons/InputButton';
import OperatorButton from '../components/Buttons/OperatorButton';
import Display from '../components/Display/Display';
import { ICalc } from '../models';

export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

interface IUIRenderProps {
  id: number;
}

const UIRender = (props: IUIRenderProps) => {
  const [input, setInput] = useState<string>('0');
  const [operator, setOperator] = useState<Operator | null>(null);
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);

  function handleInput(value: string) {
    if (input === '0') {
      setInput(value);
    } else {
      setInput(input + value);
    }
  }

  function handleOperator(value: Operator) {
    setOperator(value);
    setPreviousNumber(parseFloat(input));
    setInput('');
  }

  function handleEqual() {
    const currentNumber = parseFloat(input);
    let result: number;
    let prevInt = previousNumber?.toString().includes('.')
      ? previousNumber?.toString().indexOf('.')
      : previousNumber;
    let currInt = currentNumber?.toString().includes('.')
      ? currentNumber?.toString().indexOf('.')
      : currentNumber;

    if (prevInt) {
      var prevFract = previousNumber?.toString().slice(prevInt + 1).length;
    }
    let currFract = currentNumber?.toString().slice(currInt + 1).length;

    let fixed;
    if (prevFract) {
      fixed = Math.max(prevFract, currFract);
      if (fixed > 10) fixed = 10;
    }

    switch (operator) {
      case Operator.ADD:
        result = previousNumber! + currentNumber;
        break;
      case Operator.SUBTRACT:
        result = previousNumber! - currentNumber;
        break;
      case Operator.MULTIPLY:
        result = previousNumber! * currentNumber;
        break;
      case Operator.DIVIDE:
        if (currentNumber === 0) {
          setInput('не определено');
          return;
        }
        result = previousNumber! / currentNumber;
        break;
      default:
        result = currentNumber;
    }

    setInput(result.toFixed(fixed));
    setOperator(null);
    setPreviousNumber(null);
  }

  const calculate: ICalc[] = [
    { id: 1, title: <Display value={input} /> },
    { id: 2, title: <OperatorButton onClick={handleOperator} /> },
    { id: 3, title: <InputButton onClick={handleInput} /> },
    { id: 4, title: <EqualButton onClick={handleEqual} /> },
  ];

  const res = calculate.find((item) => item.id === props.id);

  return (
    <div className="calc">
      {calculate.map((item) => (
        <div className="downloaded_item" key={item.id}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default UIRender;

// draggable={true}
// onDragStart={(e) => dragStartHandler(e, item.id)}
// onDragEnd={(e) => dragEndHandler(e)}

// const item = calculate.find((item) => item.id === props.id);
