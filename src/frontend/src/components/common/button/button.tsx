interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  const handleOnClick = () => {
    if (!onClick) return;
    return onClick();
  };

  return <button onClick={handleOnClick}>{text}</button>;
};
