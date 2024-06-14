import React from 'react';
import { Button } from 'antd';

interface IconButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick }) => {
  return (
    <Button type="text" icon={icon} onClick={onClick}>
      {label}
    </Button>
  );
};

export default IconButton;
