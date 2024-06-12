import React from 'react';

interface IconButtonProps {
  icon: string;
  label: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label }) => {
  return (
    <button className="icon-button">
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
