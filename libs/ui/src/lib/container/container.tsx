import classNames from 'classnames';
import React from 'react';

export interface ContainerProps {
  className?: string;
  type?: 'full-width' | 'padded' | 'constraint';
}

export const Container = (props: React.PropsWithChildren<ContainerProps>) => {
  const { type = 'full-width' } = props;

  const classes = classNames(
    props.className,
    {
      'max-w-7xl mx-auto sm:px-6 lg:px-8': type === 'full-width',
    },
    {
      'container mx-auto sm:px-6 lg:px-8': type === 'padded',
    },
    {
      'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': type === 'constraint',
    }
  );

  return (
    <div className={classes}>
      {type === 'constraint' && (
        <div className="max-w-3xl mx-auto">{props.children}</div>
      )}
      {type !== 'constraint' && props.children}
    </div>
  );
};
