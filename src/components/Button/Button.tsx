import React from 'react';
import './Button.scss';

type ButtonProps = {
  /**
   * The content of the button
   */
  children: React.ReactNode;
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  /**
   * The size of the button
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * If true, the button will take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * If true, the button will be disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
};

/**
 * A customizable button component with different variants and sizes
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${
        fullWidth ? 'button--full-width' : ''
      } ${disabled ? 'button--disabled' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
