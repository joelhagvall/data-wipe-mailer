import { render, screen, fireEvent } from '@testing-library/react';
import { SendButton } from '@/components/send-button';

describe('SendButton component', () => {
  it('should render the button with the provided label', () => {
    render(
      <SendButton
        onClick={() => {}}
        disabled={false}
        selectedCount={3}
        label="Open in mail app"
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Open in mail app');
  });

  it('should display the selected count in button text', () => {
    render(
      <SendButton
        onClick={() => {}}
        disabled={false}
        selectedCount={5}
        label="Open in mail app"
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('(5)');
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <SendButton
        onClick={() => {}}
        disabled={true}
        selectedCount={0}
        label="Open in mail app"
      />
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should not be disabled when disabled prop is false', () => {
    render(
      <SendButton
        onClick={() => {}}
        disabled={false}
        selectedCount={3}
        label="Open in mail app"
      />
    );

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <SendButton
        onClick={handleClick}
        disabled={false}
        selectedCount={3}
        label="Open in mail app"
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled and clicked', () => {
    const handleClick = jest.fn();
    render(
      <SendButton
        onClick={handleClick}
        disabled={true}
        selectedCount={0}
        label="Open in mail app"
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
