import React from "react";

export interface CardProps {
  className?: string;
}

export const Card = (props: React.PropsWithChildren<CardProps>) => {
  return (
    <div
      className={`rounded shadow-lg p-2 bg-white border-1 ${
        props.className ?? ""
      }`.trim()}
    >
      {props.children}
    </div>
  );
};
