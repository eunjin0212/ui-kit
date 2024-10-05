import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SToggle from '../components/SToggle';
import '@testing-library/jest-dom';

describe('SToggle', () => {
	it('renders switch type toggle correctly', () => {
		render(
			<SToggle
				type='switch'
				value={false}
				label='Switch Label'
			/>
		);
		const label = screen.getByText('Switch Label');
		const toggleSwitch = screen.getByRole('checkbox');

		expect(label).toBeInTheDocument();
		expect(toggleSwitch).toBeInTheDocument();
		expect(toggleSwitch).not.toBeChecked();
	});

	it('renders the button type correctly', () => {
		render(
			<SToggle
				type='button'
				value={false}
				label='Button Label'
    buttonLabel='button toggle'
			/>
		);

		const label = screen.getByText('Button Label');
		const buttonSwitch = screen.getByRole('checkbox');
		const button = screen.getByRole('button');

		expect(label).toBeInTheDocument();
		expect(buttonSwitch).toBeInTheDocument();
		expect(buttonSwitch).not.toBeChecked();
		expect(button).toHaveTextContent('button toggle');
	});

	it('calls onChange when switch is toggled', () => {
		const onChangeMock = vi.fn();
		render(
			<SToggle
				type='switch'
				value={false}
				onChange={onChangeMock}
			/>
		);

		const toggleSwitch = screen.getByRole('checkbox');
		fireEvent.click(toggleSwitch);

		expect(onChangeMock).toHaveBeenCalledWith(true);
	});

	it('calls onChange when button is clicked', () => {
		const onChangeMock = vi.fn();
		render(
			<SToggle
				type='button'
				value={false}
    buttonLabel='button'
				onChange={onChangeMock}
			/>
		);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(onChangeMock).toHaveBeenCalledWith(true);
	});

	it('renders switch in disabled state', () => {
		render(
			<SToggle
				type='switch'
				value={false}
				disabled
			/>
		);

		const toggleSwitch = screen.getByRole('checkbox');
		expect(toggleSwitch).toBeDisabled();
	});

	it('renders button in disabled state', () => {
		render(
			<SToggle
				type='button'
				value={false}
				disabled
    buttonLabel='button'
			/>
		);

		const button = screen.getByRole('checkbox');
		expect(button).toBeDisabled();
	});

	it('syncs state with external value change', () => {
		const { rerender } = render(
			<SToggle
				type='switch'
				value={false}
			/>
		);

		const toggleSwitch = screen.getByRole('checkbox');
		expect(toggleSwitch).not.toBeChecked();

		rerender(
			<SToggle
				type='switch'
				value={true}
			/>
		);
		expect(toggleSwitch).toBeChecked();
	});
});
