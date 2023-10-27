import { useCallback, useState } from 'react';

export default function useInput<T>(initialForm: T) {
  const [form, setForm] = useState(initialForm);

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  return [form, onChangeHandler] as const;
}
