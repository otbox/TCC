import React, { useState } from 'react';

interface ButtonProps {
  onClick: () => void;
  color?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const Button1: React.FC<ButtonProps> = ({
  onClick,
  color = '#ffffff',
  backgroundColor = '#333333',
  children
}) => {
    const [buttonSize, setButtonSize] = useState<number>(16);

    const handleClick = () => {
        setButtonSize(10);
        onClick();
    };

  const buttonStyle: React.CSSProperties = {
    color,
    backgroundColor,
    padding: ` ${buttonSize *2}px`,
    borderRadius: '5px',
    cursor: 'pointer',
    width: `${buttonSize}`,
    height: 100,
  };

  return (
    <button onClick={handleClick} style={buttonStyle}>
      {children}
    </button>
  );
};

export default Button1;
