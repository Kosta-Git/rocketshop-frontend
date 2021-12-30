import { ChangeEventHandler, PropsWithChildren } from "react";

interface SelectInputProps {
  value: string | ReadonlyArray<string> | number | undefined;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

export const SelectInput = (props: PropsWithChildren<SelectInputProps>) => {
  const { value, onChange, className = "" } = props;

  return (
    <select
      value={value}
      onChange={onChange}
      className={`border rounded focus:outline-none text-sm md:text-base text-blue-500 border-blue-500 ${className}`.trim()}
    >
      {props.children}
    </select>
  );
};
