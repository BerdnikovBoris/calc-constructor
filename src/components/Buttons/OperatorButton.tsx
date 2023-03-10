import React from 'react';
import { Operator } from '../Calculator/Calculator';

interface OperatorButtonProps {
  handleOperator: (value: Operator) => void;
}

const OperatorButton = (props: OperatorButtonProps) => {
  const { handleOperator } = props;

  return (
    <div draggable={true}>
      <button onClick={() => handleOperator(Operator.DIVIDE)}>
        {Operator.DIVIDE}
      </button>
      <button onClick={() => handleOperator(Operator.MULTIPLY)}>
        {Operator.MULTIPLY}
      </button>
      <button onClick={() => handleOperator(Operator.SUBTRACT)}>
        {Operator.SUBTRACT}
      </button>
      <button onClick={() => handleOperator(Operator.ADD)}>
        {Operator.ADD}
      </button>
    </div>
  );
};

export default OperatorButton;
