import { useState } from 'react';

export default function useInput<T>(initialForm: T) {
  const [form, setForm] = useState(initialForm);
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return [form, onChangeHandler];
}
