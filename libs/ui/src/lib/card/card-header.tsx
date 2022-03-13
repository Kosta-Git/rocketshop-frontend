import classNames from 'classnames';
import React from 'react';

export interface CardHeaderProps {
  className?: string;
}

export const CardHeader = (props: React.PropsWithChildren<CardHeaderProps>) => {
  const classes = classNames(props.className, 'px-4 py-5 sm:px-6');

  return <div className={classes}>{props.children}</div>;
};
