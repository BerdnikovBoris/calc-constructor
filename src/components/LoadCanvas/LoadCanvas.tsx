import React, { useState } from 'react';
import { ICalc, IItems } from '../../models';
import './LoadCanvas.css';

let calculate: IItems[] = [
  { id: 1, title: 'display' },
  { id: 2, title: 'operrButton' },
  { id: 3, title: 'inButton' },
  { id: 4, title: 'eqButton' },
];

const LoadCanvas = () => {
  const [data, setData] = useState<IItems[]>(calculate);
  const [drag, setDrag] = useState<boolean>(false);
  const [downloadedItems, setDownloadedItems] = useState<IItems[]>([]);

  const dragStartHandler = (e: any, id: number) => {
    // e.preventDefault();
    e.dataTransfer.setData('text/plain', id.toString());
    setData((prevState) => prevState.filter((val) => val.id !== id));
    console.log(e, e.dataTransfer);
    setDrag(true);
    console.log('драг отправляет');
  };

  const dragLeaveHandler = (e: any) => {
    e.preventDefault();
    setDrag(false);
    setDownloadedItems([]);
  };

  const dragOverHandler = (e: any) => {
    e.preventDefault();
    setDrag(false);
  };

  const dropHandler = (e: any) => {
    console.log('дроп работает');
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData('text/plain');
    const droppedItem = calculate.find(
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
        <div className="calc">
          {calculate.map((item) => (
            <div
              key={item.id}
              draggable={true}
              onDragStart={(e) => dragStartHandler(e, item.id)}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="canv_wrap">
          {drag ? (
            <div
              className="drop_area"
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropHandler(e)}
            ></div>
          ) : downloadedItems.length !== 0 ? (
            <div className="drop_items">
              {downloadedItems.map((item) => (
                <div className="downloaded_item" key={item.id}>
                  {item.title}
                </div>
              ))}
            </div>
          ) : (
            <div className="drop_text">
              <h3
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
              >
                Перетащите сюда
              </h3>
              <p>любой элемент</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadCanvas;
