interface EqualButtonProps {
  onClick: () => void;
}

const EqualButton = (props: EqualButtonProps) => {
  const { onClick } = props;

  return (
    <button onClick={onClick} draggable={true}>
      =
    </button>
  );
};

export default EqualButton;
