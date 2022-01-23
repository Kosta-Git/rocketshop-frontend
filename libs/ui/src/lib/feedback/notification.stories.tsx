import { Story, Meta } from '@storybook/react';
import { Notification } from './notification';

export default {
  component: Alert,
  title: 'Alert',
} as Meta;

const Template: Story<AlertProps> = (args) => <Alert {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  title: "Alert title",
  content: "Alert content",
  status: 'info'
};
