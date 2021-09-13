import { render, screen } from '@testing-library/react';
import { MessagesProvider } from '../context/messages';
import MessagesItem from '../components/MessagesItem';
import { IMessage } from '../lib/types';
import ProviderTheme from './utils/ProviderTheme';

const renderComponent = (props: IMessage) =>
  render(
    <ProviderTheme>
      <MessagesProvider>
        <MessagesItem {...props} />
      </MessagesProvider>
    </ProviderTheme>
  );

describe('MessagesItem', () => {
  it('renders an error message ⚬ MessagesItem', async () => {
    const message = 'This is an error';
    const props: IMessage = {
      message,
      priority: 0,
      id: 'qwerty'
    };

    renderComponent(props);

    expect(screen.getByText(message)).toHaveStyle({ background: '#F56236' });
  });

  it('renders an warning message ⚬ MessagesItem', async () => {
    const message = 'This is a warning';
    const props: IMessage = {
      message,
      priority: 1,
      id: 'qwerty'
    };

    renderComponent(props);

    expect(screen.getByText(message)).toHaveStyle({ background: '#FCE788' });
  });

  it('renders an info message ⚬ MessagesItem', async () => {
    const message = 'This is an info';
    const props: IMessage = {
      message,
      priority: 2,
      id: 'qwerty'
    };

    renderComponent(props);

    expect(screen.getByText(message)).toHaveStyle({ background: '#88FCA3' });
  });
});
