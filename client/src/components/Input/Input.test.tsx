import { render, screen, renderHook, fireEvent } from '@testing-library/react';
import Input from './Input.component';
import useInput from '../../hooks/form/useInput';
import { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';

describe('SignIn UI Test', () => {
  test('Init Render', () => {
    const { result } = renderHook(() =>
      useInput({
        id: '',
      })
    );
    const [form, onChange] = result.current;

    render(<Input onChangeHandler={onChange} name='id' value={form.id} />);

    const inputElem = screen.getByLabelText('form-input') as HTMLInputElement;

    expect(inputElem.value).toBe('');
  });

  test('Input Change', () => {
    const { result } = renderHook(() =>
      useInput({
        id: '',
        password: '',
      })
    );
    const [form, onChange] = result.current;

    render(<Input onChangeHandler={onChange} name='id' value={form.id} />);
    const inputElem = screen.getByLabelText('form-input') as HTMLInputElement;

    fireEvent.change(inputElem, { target: { value: '12', name: 'id' } });
    const [changedForm] = result.current;
    
    // 변경 후
    expect(changedForm.id).toBe('12');
  });
});
