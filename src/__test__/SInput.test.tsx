import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SInput  from '../components/SInput';

describe('SInput component', () => {
  it('renders correctly with default props', () => {
    render(<SInput value="" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders label and placeholder', () => {
    const label = 'Test Label';
    const placeholder = 'Enter text';
    render(<SInput value="" label={label} placeholder={placeholder} />);

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChange when the input value changes', () => {
    const handleChange = vi.fn();
    render(<SInput value="" onChange={handleChange} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledWith('new value');
  });

  it('does not call onChange when disabled', () => {
    const handleChange = vi.fn();
    render(<SInput value="" onChange={handleChange} disabled={true} />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('changes status class on focus', () => {
    render(<SInput value="" status="normal" />);

    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);

    expect(inputElement).toHaveClass('border-Blue_C_Default'); // Focus status class
  });

  it('updates the input value when the value prop changes', () => {
    const { rerender } = render(<SInput value="initial value" />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('initial value');

    rerender(<SInput value="updated value" />);
    expect(inputElement).toHaveValue('updated value');
  });

  it('disables the input when the disabled prop is true', () => {
    render(<SInput value="" disabled={true} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  it('renders insideLabel correctly', () => {
    const insideLabel = 'USD';
    render(<SInput value="" insideLabel={insideLabel} />);

    const insideLabelElement = screen.getByText(insideLabel);
    expect(insideLabelElement).toBeInTheDocument();
  });
});
