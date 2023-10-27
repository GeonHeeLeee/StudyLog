import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('Test Profile Page', () => {
  test('Initial Rendering', () => {
    render(<Profile />);
    const titleElem = screen.getByRole('heading', {
      name: 'Profile'
    });
    expect(titleElem).toBeInTheDocument();
  });
});
