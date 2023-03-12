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
  return (
    <div className="canv_wrap">
      {props.drag ? (
        <div
          className="drop_area"
          draggable={false}
          onDragLeave={(e) => props.dragLeaveHandler(e)}
          onDragOver={(e) => props.dragOverHandler(e)}
          onDrop={(e) => props.dropHandler(e)}
        ></div>
      ) : props.downloadedItems.length === 0 ? (
        <div className="drop_text">
          <h3
            onDragLeave={(e) => props.dragLeaveHandler(e)}
            onDragOver={(e) => props.dragOverHandler(e)}
          >
            Перетащите сюда
          </h3>
          <p>любой элемент</p>
        </div>
      ) : (
        <div className="drop_items">
          {props.downloadedItems.map((item) => (
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
