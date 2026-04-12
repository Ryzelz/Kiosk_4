/**
 * TC-03 — Login Form Validation (Empty Fields)
 *
 * Submitting an empty form should show validation error messages for both
 * email and password fields.
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/LoginForm';

test('shows errors when fields are empty', async () => {
  render(<LoginForm />);

  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });
});
