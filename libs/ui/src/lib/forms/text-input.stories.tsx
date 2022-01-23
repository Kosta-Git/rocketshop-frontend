import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { InputField, InputFieldProps } from './text-input';

export default {
  component: InputField,
  title: 'Text Input',
} as Meta;

const Template: Story<InputFieldProps> = (args) => {
  const [value, setValue] = useState<string | ReadonlyArray<string> | number | undefined>(args.value);

  return <InputField {...args} value={value} onChange={e => setValue(e.target.value)}/>;
};

export const Primary = Template.bind({});
Primary.args = {
  name: "",
  type: "text",
  label: "Example",
  placeholder: "",
  disabled: false,
  required: true,
  help: false,
  state: 'success',
  subtitle: undefined,
  helpers: [],
  className: "",
};
