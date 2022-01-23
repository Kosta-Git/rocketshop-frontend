import { Story, Meta } from '@storybook/react';
import { SelectInput, SelectInputProps } from './select-input';

export default {
  component: SelectInput,
  title: 'Select input',
} as Meta;

const Template: Story<SelectInputProps> = (args) => <SelectInput {...args}>
        {[5, 10, 20, 30, 40, 50].map((ps) => (
          <option key={ps} value={ps}>
            Show {ps}
          </option>
        ))}
</SelectInput>;

export const Primary = Template.bind({});
Primary.args = {
};
