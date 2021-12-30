import { PropsWithChildren } from "react";

interface OptionInputProps {
  value: string | ReadonlyArray<string> | number | undefined;
  className?: string;
}

export const OptionInput = (props: PropsWithChildren<OptionInputProps>) => {
  const { value, className = "" } = props;

  return (
    <option value={value} className={`${className}`.trim()}>
      {props.children}
    </option>
  );
};
