import React, { ButtonHTMLAttributes } from 'react';

type Props = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ text, type='button', onClick, ...props }: Props) {
  return (
    <button type={type} onClick={onClick} {...props}>
      {text}
    </button>
  );
}
