import { render, screen } from '@testing-library/react';
import Setting from './Setting';

describe('Test Setting Page', () => {
  test('Initial Render', () => {
    render(<Setting />);
    const titleElem = screen.getByRole('heading', {
      name: 'Setting',
    });

    expect(titleElem).toBeInTheDocument();
  });
});
