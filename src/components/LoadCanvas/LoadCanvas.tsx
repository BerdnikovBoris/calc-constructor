import React, { useState } from 'react';
import { ICalc } from '../../models';
import './LoadCanvas.css';
import Calculator from '../Calculator/Calculator';
import DropArea from '../DropArea/DropArea';

const LoadCanvas = () => {
  const [data, setData] = useState<ICalc[]>([]);
  const [drag, setDrag] = useState<boolean>(false);
  const [downloadedItems, setDownloadedItems] = useState<ICalc[]>([]);

  const dragStartHandler = (e: any, id: number) => {
    e.dataTransfer.setData('id', id.toString());
    setData((prevState) => prevState?.filter((val) => val.id !== id));
    console.log(data);
    setDrag(true);
    e.target.style.display = 'block';
  };

  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setDrag(true);
    setDownloadedItems([]);
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragEndHandler = (e: any) => {
    e.preventDefault();
    e.target.style.opacity = '0.5';
    e.target.style.pointerEvents = 'none';
  };

  const dropHandler = (e: any) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('id');
    const droppedItem = data.find(
      (item) => item.id.toString() === droppedItemId
    );
    if (droppedItem) {
      setDownloadedItems((prevState) => [...prevState, droppedItem]);
    }
    setDrag(false);
  };

  return (
    <div className="load_app">
      <div className="load_cont">
        <Calculator
          dragStartHandler={dragStartHandler}
          dragEndHandler={dragEndHandler}
        />

        <DropArea
          dragLeaveHandler={dragLeaveHandler}
          dragOverHandler={dragOverHandler}
          dropHandler={dropHandler}
          drag={drag}
          downloadedItems={downloadedItems}
        />
      </div>
    </div>
  );
};

export default LoadCanvas;

// const [isCalculator, setIsCalculator] = useState(true);
// const handleCalculatorButtonClick = () => {
//   setIsCalculator(true);
// };

// const handleDropAreaButtonClick = () => {
//   setIsCalculator(false);
// };

{
  /* <button onClick={handleCalculatorButtonClick}>Калькулятор</button>
      <button onClick={handleDropAreaButtonClick}>Drop area</button> */
}
