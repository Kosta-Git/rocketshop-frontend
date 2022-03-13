import classNames from 'classnames';
import React from 'react';

export interface CardFooterProps {
  className?: string;
}

export const CardFooter = (props: React.PropsWithChildren<CardFooterProps>) => {
  const classes = classNames(props.className, 'px-4 py-4 sm:px-6');

  return <div className={classes}>{props.children}</div>;
};
