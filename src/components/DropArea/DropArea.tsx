import React from 'react';
import { ICalc } from '../../models';

interface DropAreaProps {
  dragLeaveHandler: (e: any) => void;
  dragOverHandler: (e: any) => void;
  dropHandler: (e: any) => void;
  drag: boolean;
  downloadedItems: ICalc[];
}

const DropArea = (props: DropAreaProps) => {
  const {
    dragLeaveHandler,
    dragOverHandler,
    dropHandler,
    drag,
    downloadedItems,
  } = props;
  return (
    <div className="canv_wrap">
      {drag ? (
        <div
          className="drop_area"
          draggable={false}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e)}
        ></div>
      ) : downloadedItems.length === 0 ? (
        <div className="drop_text">
          <h3
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
          >
            Перетащите сюда
          </h3>
          <p>любой элемент</p>
        </div>
      ) : (
        <div className="drop_items">
          {downloadedItems.map((item) => (
            <div className="downloaded_item" key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropArea;
