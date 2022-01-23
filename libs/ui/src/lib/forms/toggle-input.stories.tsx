import { Story, Meta } from '@storybook/react';
import { useEffect, useState } from 'react';
import { ToggleInput, ToggleInputProps } from './toggle-input';

export default {
  component: ToggleInput,
  title: 'Toggle Input',
} as Meta;

const Template: Story<ToggleInputProps> = (args) => {
  const [value, setValue] = useState<boolean>(args.enabled);

  useEffect(() => {
    setValue(args.enabled);
  }, [args]);

  return (
    <ToggleInput {...args} enabled={value} onChange={setValue}>
      Hello, world?
    </ToggleInput>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'toggle',
  enabled: false,
  labelPosition: 'left',
};
