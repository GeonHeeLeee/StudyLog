import { renderHook } from '@testing-library/react';
import useInput from './useInput';
import { act } from 'react-dom/test-utils';
import { ChangeEvent } from 'react';

describe('login Test', () => {
  const initForm = {
    id: '',
    password: '',
  };

  test('init', () => {
    const { result } = renderHook(() => useInput(initForm));
    const [initValue] = result.current;
    expect(initValue).toBe(initForm);
  });

  test('Id Input Change', () => {
    const { result } = renderHook(() => useInput(initForm));
    const [, onChangeHandler] = result.current;
    const changedId = 'aaa';

    act(() =>
      onChangeHandler({
        target: {
          name: 'id',
          value: changedId,
        },
      } as ChangeEvent<HTMLInputElement>)
    );
    const [changedForm] = result.current;
    expect(changedForm.id).toBe(changedId);
  });

  test('Password Input Change', () => {
    const { result } = renderHook(() => useInput(initForm));
    const [, onChangeHandler] = result.current;
    const changedPw = 'aaabbb';

    act(() =>
      onChangeHandler({
        target: {
          name: 'password',
          value: changedPw,
        },
      } as ChangeEvent<HTMLInputElement>)
    );
    const [changedForm] = result.current;
    expect(changedForm.password).toBe(changedPw);
  });
});
