import { Story, Meta } from '@storybook/react';
import { Card, CardProps } from './card';

export default {
  component: Card,
  title: 'Card',
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args}>Hello, world</Card>;

export const Primary = Template.bind({});
Primary.args = {
  className: '',
};
