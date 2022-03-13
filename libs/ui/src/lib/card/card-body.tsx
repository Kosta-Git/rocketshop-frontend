import classNames from 'classnames';
import React from 'react';

export interface CardBodyProps {
  className?: string;
}

export const CardBody = (props: React.PropsWithChildren<CardBodyProps>) => {
  const classes = classNames(props.className, 'px-4 py-5 sm:p-6');

  return <div className={classes}>{props.children}</div>;
};
