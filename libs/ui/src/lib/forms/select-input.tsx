import classNames from 'classnames';
import { ChangeEventHandler, PropsWithChildren } from 'react';

export interface SelectInputProps {
  value: string | ReadonlyArray<string> | number | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  name?: string;
  autocomplete?: string;
}

export const SelectInput = (props: PropsWithChildren<SelectInputProps>) => {
  const { value, onChange, name, autocomplete, className = '' } = props;

  const classes = classNames(
    "focus:ring-gray-500 focus:border-gray-500 shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md".split(" "),
    className.split(" ")
  )

  return (
    <select
      name={name}
      autoComplete={autocomplete}
      onChange={onChange}
      value={value}
      className={classes}
    >
      {props.children}
    </select>
  );
};
