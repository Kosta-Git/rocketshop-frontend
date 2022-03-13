import { CheckCircleIcon } from '@heroicons/react/solid';
import { Story, Meta } from '@storybook/react';
import { Notification } from './notification';
import { NotificationAction } from './notification-action';

export default {
  component: Notification,
  title: 'Notification',
} as Meta;

const Template: Story = (args) => <Notification {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  body: 'body',
  icon: (
    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
  ),
  actions: [
    <NotificationAction title={'Action'} />,
    <NotificationAction title={'Action'} style={'secondary'} />,
  ],
};
