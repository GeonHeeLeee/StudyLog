import React, { InputHTMLAttributes, useEffect, useState } from 'react';

interface OnChangeHandler {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

type Props = {
  onChangeHandler: OnChangeHandler;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  type = 'text',
  onChangeHandler,
  name,
  value = '',
}: Props) {
  return (
    <>
      <input
        type={type}
        onChange={onChangeHandler}
        name={name}
        value={value}
        aria-label='form-input'
      />
    </>
  );
}
