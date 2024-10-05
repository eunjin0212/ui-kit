import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import STooltip from '../components/STooltip';

describe('STooltip Component', () => {
  it('renders the button content', () => {
    render(
      <STooltip button="Hover me" location="top">
        Tooltip content
      </STooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('shows the tooltip on hover', async () => {
    render(
      <STooltip button="Hover me" location="top">
        Tooltip content
      </STooltip>
    );

    // Hover over the button
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Tooltip content should be displayed
    expect(await screen.findByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides the tooltip when mouse leaves the button', async () => {
    render(
      <STooltip button="Hover me" location="top">
        Tooltip content
      </STooltip>
    );

    const button = screen.getByText('Hover me');

    // Hover over the button
    fireEvent.mouseOver(button);
    expect(await screen.findByText('Tooltip content')).toBeInTheDocument();

    // Mouse out from the button
    fireEvent.mouseOut(button);

    // Tooltip content should be hidden
    expect(screen.queryByText('Tooltip content')).toBeNull();
  });

  it('toggles the tooltip when `useToggle` is true', async () => {
    render(
      <STooltip button="Click me" location="top" useToggle>
        Toggleable Tooltip content
      </STooltip>
    );

    const button = screen.getByText('Click me');

    // Initially tooltip should not be displayed
    expect(screen.queryByText('Toggleable Tooltip content')).toBeNull();

    // Hover over the button
    fireEvent.mouseOver(button);
    expect(await screen.findByText('Toggleable Tooltip content')).toBeInTheDocument();

    // Click the close button to toggle tooltip off
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Toggleable Tooltip content')).toBeNull();
  });

  it('renders the title and actions if provided', async () => {
    render(
      <STooltip
        button="Hover me"
        title="Tooltip Title"
        actions={[<button key="action1">Action 1</button>, <button key="action2">Action 2</button>]}
      >
        Tooltip content
      </STooltip>
    );

    // Hover over the button
    fireEvent.mouseOver(screen.getByText('Hover me'));

    // Check if the title and actions are rendered correctly
    expect(await screen.findByText('Tooltip Title')).toBeInTheDocument();
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });
});
