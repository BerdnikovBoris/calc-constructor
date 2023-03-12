import React, { useState } from 'react';
import { ICalc } from '../../models';
import EqualButton from '../Buttons/EqualButton';
import InputButton from '../Buttons/InputButton';
import OperatorButton from '../Buttons/OperatorButton';
import Display from '../Display/Display';

interface CalculatorProps {
  dragStartHandler: (e: any, id: number) => void;
  dragEndHandler: (e: any) => void;
}

export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

const Calculator = (props: CalculatorProps) => {
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

  const display = <Display value={input} />;
  const operButton = <OperatorButton handleOperator={handleOperator} />;
  const inButton = <InputButton onClick={handleInput} />;
  const eqButton = <EqualButton onClick={handleEqual} />;

  const calculate: ICalc[] = [
    { id: 1, title: display },
    { id: 2, title: operButton },
    { id: 3, title: inButton },
    { id: 4, title: eqButton },
  ];

  return (
    <div className="calc">
      {calculate.map((item) => (
        <div
          className="downloaded_item"
          key={item.id}
          draggable={true}
          onDragStart={(e) => props.dragStartHandler(e, item.id)}
          onDragEnd={(e) => props.dragEndHandler(e)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Calculator;
