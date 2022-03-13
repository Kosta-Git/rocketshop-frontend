import { Story, Meta } from '@storybook/react';
import { Card, CardProps } from './card';
import { CardBody } from './card-body';
import { CardFooter } from './card-footer';
import { CardHeader } from './card-header';

export default {
  component: Card,
  title: 'Card',
} as Meta;

const Template: Story<CardProps> = (args) => (
  <Card {...args}>
    <CardHeader>
      Title
    </CardHeader>
    <CardBody>
      Body
    </CardBody>
    <CardFooter>
      Footer
    </CardFooter>
  </Card>
);

export const Primary = Template.bind({});
Primary.args = {
  className: '',
};
