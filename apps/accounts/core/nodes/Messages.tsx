import { UiText } from '@ory/kratos-client';
import { Alert } from '@rocketshop-monorepo/ui';

interface MessagesProps {
  messages?: Array<UiText>;
}

export const Messages = ({ messages }: MessagesProps) => {
  if (!messages) {
    // No messages? Do nothing.
    return null;
  }

  return (
    <div className='my-2'>
      {messages.map((message) => (
        <Alert
          key={message.id}
          title={message.type === 'error' ? 'Error' : 'Info'}
          status={message.type === 'error' ? 'error' : 'info'}
          content={message.text}
        />
      ))}
    </div>
  );
};
