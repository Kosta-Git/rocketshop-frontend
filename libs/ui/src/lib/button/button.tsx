import { PropsWithChildren } from "react";
import "./button.module.css";

interface ButtonProps {
    disabled?: boolean;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const {disabled = false, className = "", type = "button"} = props;
    const classes = `btn ${disabled ? "btn-disabled" : "btn-enabled"} ${className}`.trim();

    return (
        <button type={type} disabled={disabled} className={classes} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
