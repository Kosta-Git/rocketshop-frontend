import classNames from 'classnames';
import React from 'react';

export interface CardProps {
  className?: string;
}

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  const classes = classNames(
    props.className,
    'bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200'
  );

  return (
    <div className={classes}>
      <div className="px-4 py-5 sm:p-6">{props.children}</div>
    </div>
  );
};
