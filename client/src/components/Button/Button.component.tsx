import React, { ButtonHTMLAttributes } from 'react';
type Props = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ text, type, onClick }: Props) {
  return (
    <button type={type} onClick={onClick}>
      {text}
    </button>
  );
}
