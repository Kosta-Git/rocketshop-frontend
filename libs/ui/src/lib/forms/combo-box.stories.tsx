import { Story, Meta } from '@storybook/react';
import { ComboBox, ComboBoxProps } from './combo-box';

export default {
  component: ComboBox,
  title: 'Combo Box',
} as Meta;

const Template: Story<ComboBoxProps<string>> = (args) => <ComboBox {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
  label: "Storybook Combo box",
  query: [
    'John Doe',
    'Michael Foster',
    'Emma Dorsey',
    'Kosta Sovaridis',
    'Leslie Alexander',
  ],
  keyExtractor: (t) => t,
  nameExtractor: (t) => t,
  onSelected: (t) => console.log(t)
};
