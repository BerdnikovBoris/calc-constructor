import React, { useState, useCallback } from 'react';
import { ICalc } from '../../models';
import EqualButton from '../Buttons/EqualButton';
import InputButton from '../Buttons/InputButton';
import OperatorButton from '../Buttons/OperatorButton';
import Display from '../Display/Display';
import './LoadCanvas.css';

// const itemId = parseInt(e.dataTransfer.getData('id'));
// const item = boards.find((item) => item.id === itemId);
// if (item) setDownloadedItems([...downloadedItems, item]);

// if (id) e.dataTransfer.setData('id', id.toString());
// setBoards(boards.filter((item) => item.id !== id));

export enum Operator {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '*',
  DIVIDE = '/',
}

const LoadCanvas = () => {
  const [drag, setDrag] = useState<boolean>(false);
  const [downloadedItems, setDownloadedItems] = useState<ICalc[]>([]);
  //=========================ХУКИ ДРОПА
  const [input, setInput] = useState<string>('0');
  const [operator, setOperator] = useState<Operator | null>(null);
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  //=========================ХУКИ КАЛЬКУЛЯТОРА

  const dragStartHandler = (e: any, item?: ICalc) => {
    e.preventDefault();
    if (item) e.dataTransfer.setData('text/plain', item.id.toString());
    setDrag(true);
    console.log('драг отправляет');
  };

  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e: any) => {
    console.log('дроп работает');
    e.preventDefault();
    console.log('e', e);
    console.log('data', e.dataTransfer);
    const droppedItemId = e.dataTransfer.getData('text/plain');
    const droppedItem = calculate.find(
      (item) => item.id.toString() === droppedItemId
    );

    if (droppedItem) {
      setDownloadedItems((prevItems) => [...prevItems, droppedItem]);
    }
    setDrag(false);
  };

  //======================ВЫШЕ МЕТОДЫ ДРОПА=========

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

  //======================ВЫШЕ МЕТОДЫ КАЛЬКУЛЯТОРА=========

  const display = <Display value={input} />;
  const operrButton = <OperatorButton handleOperator={handleOperator} />;
  const inButton = <InputButton onClick={handleInput} />;
  const eqButton = <EqualButton onClick={handleEqual} />;
  let calculate: ICalc[] = [
    { id: 1, title: display },
    { id: 2, title: operrButton },
    { id: 3, title: inButton },
    { id: 4, title: eqButton },
  ];

  return (
    <div className="load_app">
      <div className="load_cont">
        <div className="calc">
          {display}
          {operrButton}
          {inButton}
          {eqButton}
        </div>

        <div className="canv_wrap">
          {drag ? (
            <div
              className="drop_area"
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => dropHandler(e)}
            ></div>
          ) : downloadedItems.length === 0 ? (
            <div className="drop_text">
              <h3
                onDragStart={(e) => dragStartHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragStartHandler(e)}
              >
                Перетащите сюда
              </h3>
              <p>любой элемент</p>
            </div>
          ) : (
            <div className="drop_items">
              {downloadedItems.map((item, index) => (
                <div className="downloaded_item" key={index}>
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadCanvas;

{
  /* <div className="load_wrap">
          <div className="load_board">
            {boards.map((item: IItems) => (
              <div
                className="load_item"
                key={item.id}
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, item.id)}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div> */
}
