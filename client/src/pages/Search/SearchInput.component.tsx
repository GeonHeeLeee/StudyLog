import React, { ChangeEvent, useState } from 'react';

import Input from '../../components/Input/Input.component';

export default function SearchInput() {
  const [query, setQuery] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // throttle
    setQuery(e.target.value);
  };
  return (
    <div>
      <Input name='query' onChangeHandler={changeHandler} value={query} />
    </div>
  );
}
