import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SRadio, { RadioProps } from '../components/SRadio';
import '@testing-library/jest-dom';

describe('SRadio', () => {
	const defaultProps: RadioProps = {
		label: 'Test Radio',
		name: 'testRadio',
		checked: 'option1',
		value: 'option1',
		onChange: vi.fn(),
	};

	it('renders correctly', () => {
		render(<SRadio {...defaultProps} />);

		const radio = screen.getByLabelText(defaultProps.label);
		expect(radio).toBeInTheDocument();
		expect(radio).toHaveAttribute('type', 'radio');
		expect(radio).toHaveAttribute('name', defaultProps.name);
		expect(radio).toHaveAttribute('value', defaultProps.value);
		expect(radio).toBeChecked();
	});

	it('does not trigger onChange when disabled', () => {
		const handleChange = vi.fn();
		render(
			<SRadio
				{...defaultProps}
				onChange={handleChange}
				disabled
			/>
		);

		const radio = screen.getByLabelText(defaultProps.label);
		fireEvent.click(radio);

		expect(handleChange).not.toHaveBeenCalled();
	});

	it('changes checked state based on the model prop', () => {
		const { rerender } = render(
			<SRadio
				{...defaultProps}
				checked='option2'
			/>
		);

		const radio = screen.getByLabelText(defaultProps.label);
		expect(radio).not.toBeChecked();

		rerender(
			<SRadio
				{...defaultProps}
				checked='option1'
			/>
		);
		expect(radio).toBeChecked();
	});

	it('applies the correct styles based on the disabled prop', () => {
		const { container } = render(
			<SRadio
				{...defaultProps}
				disabled
			/>
		);

		const radioLabel = container.querySelector('label');
		expect(radioLabel).toHaveClass('cursor-not-allowed');

		const radioInput = container.querySelector('input');
		expect(radioInput).toHaveClass(
			'border-Grey_Lighten-2 bg-Grey_Lighten-4 cursor-not-allowed'
		);
	});
});
