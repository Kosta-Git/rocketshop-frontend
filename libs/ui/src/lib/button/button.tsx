import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export interface ButtonProps {
  disabled?: boolean;
  className?: string;
  name?: string;
  value?: string | ReadonlyArray<string> | number;
  style?: 'primary' | 'secondary' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  type?: 'submit' | 'reset' | 'button';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const {
    disabled = false,
    name,
    value,
    style = 'primary',
    size = 'md',
    className = '',
    type = 'button',
  } = props;

  const classes = classNames(
    /* Sizes */
    {
      'px-2.5 py-1.5  text-xs': size === 'xs',
    },
    {
      'px-3 py-2  text-sm': size === 'sm',
    },
    {
      'px-4 py-2  text-xs': size === 'md',
    },
    {
      'px-4 py-2  text-base': size === 'lg',
    },
    {
      'px-6 py-3 text-base': size === 'xl',
    },
    /* Styles */
    {
      'border-transparent shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500':
        style === 'primary',
    },
    {
      'border-transparent text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500':
        style === 'secondary',
    },
    {
      'border-gray-300 shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500':
        style === 'white',
    },
    /* Disabled */
    { 'opacity-50 cursor-not-allowed': disabled },
    /* Shared styles */
    'inline-flex items-center border font-medium rounded',
    /* User input */
    className.split(' ')
  );

  return (
    <button
      name={name}
      value={value}
      type={type}
      disabled={disabled}
      className={classes}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
