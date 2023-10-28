import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button.component';

describe('Button Test', () => {
  test('Init Render', () => {
    render(<Button type='button' text='ClickMe!' />);
    const buttonElem = screen.getByRole('button', {
      name: 'ClickMe!',
    });
    expect(buttonElem).toBeInTheDocument();
  });

  test('Button Click Test', () => {
    const handleClick = jest.fn();
    render(<Button type='button' text='ClickMe!' onClick={handleClick} />);
    const buttonElem = screen.getByRole('button', {
      name: 'ClickMe!',
    });
    fireEvent.click(buttonElem);

    expect(handleClick).toBeCalledTimes(1);
  });
});
