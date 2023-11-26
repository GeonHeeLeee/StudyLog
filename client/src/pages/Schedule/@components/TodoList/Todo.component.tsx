import React from 'react';

type Props = {
  todo: string;
}

export default function Todo({todo}: Props) {
  return (
    <li>
      {todo}
    </li>
  );
}

