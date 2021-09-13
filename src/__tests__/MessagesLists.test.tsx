import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { MessagesProvider } from '../context/messages';
import MessagesLists from '../components/MessagesLists';

const renderComponent = () =>
  render(
    <MessagesProvider>
      <MessagesLists />
    </MessagesProvider>
  );

describe('MessagesLists', () => {
  it('renders Pause / Clear button ⚬ MessagesLists', async () => {
    renderComponent();

    expect(screen.getByText('pause')).toBeInTheDocument();
    expect(screen.getByText('Clear all messages')).toBeInTheDocument();
  });

  it('should pause and resume the messages ⚬ MessagesLists', async () => {
    renderComponent();

    expect(screen.queryByText('resume')).toBeNull();

    fireEvent.click(screen.getByText('pause'));

    expect(screen.queryByText('pause')).toBeNull();
    expect(screen.queryByText('resume')).toBeInTheDocument();
  });

  it('should have 3 columns/lists', () => {
    renderComponent();

    expect(screen.getAllByTestId('MessagesList')).toHaveLength(3);
  });
});
