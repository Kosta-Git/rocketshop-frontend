import { Story, Meta } from '@storybook/react';
import { Notification } from './notification';

export default {
  component: Notification,
  title: 'Notification',
} as Meta;

const Template: Story = (args) => <Notification {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
};
