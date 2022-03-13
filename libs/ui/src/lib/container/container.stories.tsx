import { Story, Meta } from '@storybook/react';
import { Container, ContainerProps } from './container';

export default {
  component: Container,
  title: 'Container',
} as Meta;

const Template: Story<ContainerProps> = (args) => <Container {...args}>Hello, world</Container>;

export const Primary = Template.bind({});
Primary.args = {
  className: '',
  type: 'full-width'
};
