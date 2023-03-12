import React from 'react';
import { Operator } from '../../uikit/UIRender';

interface OperatorButtonProps {
  onClick: (value: Operator) => void;
}

const OperatorButton = (props: OperatorButtonProps) => {
  const { onClick } = props;

  return (
    <div draggable={true}>
      <button onClick={() => onClick(Operator.DIVIDE)}>
        {Operator.DIVIDE}
      </button>
      <button onClick={() => onClick(Operator.MULTIPLY)}>
        {Operator.MULTIPLY}
      </button>
      <button onClick={() => onClick(Operator.SUBTRACT)}>
        {Operator.SUBTRACT}
      </button>
      <button onClick={() => onClick(Operator.ADD)}>{Operator.ADD}</button>
    </div>
  );
};

export default OperatorButton;
