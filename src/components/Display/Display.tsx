import React from 'react';

interface DisplayProps {
  value: string;
}

function Display(props: DisplayProps) {
  return <input type="text" readOnly value={props.value} draggable={true} />;
}

export default Display;
