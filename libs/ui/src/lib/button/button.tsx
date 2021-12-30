import classNames from "classnames";
import { PropsWithChildren } from "react";

interface ButtonProps {
    disabled?: boolean;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const {disabled = false, className = "", type = "button"} = props;

    const classes = classNames(
      "btn",
      {
        "btn-disabled": disabled
      },
      {
        "btn-enabled": !disabled
      },
      className.split(" ")
    )

    return (
        <button type={type} disabled={disabled} className={classes} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
