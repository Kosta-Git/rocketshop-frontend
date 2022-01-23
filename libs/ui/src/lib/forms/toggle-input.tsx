import { PropsWithChildren } from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';

export interface ToggleInputProps {
  name: string;
  enabled: boolean;
  labelPosition?: 'left' | 'right';
  onChange: (checked: boolean) => void;
}

export const ToggleInput = (props: PropsWithChildren<ToggleInputProps>) => {
  const { name, enabled, onChange, labelPosition = 'left' } = props;
  const hasLabel = props.children;

  return (
    <Switch.Group as="div" className="flex items-center">
      {hasLabel && labelPosition === 'left' && (
        <Switch.Label as="span" className="mr-3">
          {props.children}
        </Switch.Label>
      )}
      <Switch
        name={name}
        type={"button"}
        checked={enabled}
        onChange={onChange}
        className={classNames(
          enabled ? 'bg-gray-600' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      {hasLabel && labelPosition === 'right' && (
        <Switch.Label as="span" className="ml-3">
          {props.children}
        </Switch.Label>
      )}
    </Switch.Group>
  );
};
