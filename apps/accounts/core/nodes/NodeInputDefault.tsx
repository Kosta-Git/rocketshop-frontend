import { InputField } from '@rocketshop-monorepo/ui';
import { NodeInputProps } from './helpers';

export function NodeInputDefault<T>(props: NodeInputProps) {
  const { node, attributes, value = '', setValue, disabled } = props;

  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = () => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick);
      run();
    }
  };

  // Only keep unique ids
  const messages = [
    ...node.messages
      .reduce((a, c) => {
        a.set(c.id, c);
        return a;
      }, new Map())
      .values(),
  ];

  // Render a generic text input field.
  return (
    <InputField
      label={node.meta.label?.text}
      onClick={onClick}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type={attributes.type}
      name={attributes.name}
      value={value}
      disabled={attributes.disabled || disabled}
      help={messages.length > 0}
      state={
        messages.find(({ type }) => type === 'error') ? 'error' : undefined
      }
      helpers={messages.map(({ text, id }, k) => text)}
    />
  );
}
