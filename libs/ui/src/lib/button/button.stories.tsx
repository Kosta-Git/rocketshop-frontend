import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './button';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Hello, world</Button>;

export const Primary = Template.bind({});
Primary.args = {
  disabled: false,
  className: '',
  name: '',
  value: undefined,
  style: 'primary',
  size: 'md',
  type: 'button',
  onClick: console.log,
};
