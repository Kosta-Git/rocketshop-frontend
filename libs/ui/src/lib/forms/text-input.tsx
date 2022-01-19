import ExclamationCircleIcon from '@heroicons/react/outline/ExclamationCircleIcon';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { bool } from 'yup';

interface InputFieldProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  help?: boolean;
  state?: 'success' | 'error' | 'disabled';
  subtitle?: ReactNode;
  helpers?: string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  value?: string | ReadonlyArray<string> | number;
  className?: string;
}

export const InputField = (props: InputFieldProps) => {
  const {
    name,
    type = 'text',
    label,
    placeholder,
    help,
    state,
    subtitle,
    helpers,
    value,
    disabled,
    onClick,
    onChange,
    className,
    onBlur,
    required = true,
  } = props;

  const inputClasses = classNames(
    'shadow-sm',
    'block',
    'w-full',
    'sm:text-sm',
    {
      'border-gray-300 focus:ring-gray-500 focus:border-gray-500':
        state === 'success',
    },
    {
      'border-red-600 focus:ring-red-600 focus:border-red-600 text-red-400':
        state === 'error',
    },
    'rounded-md'
  );

  const helperClasses = classNames(
    'my-2',
    'text-sm',
    {
      'text-red-600': state === 'error',
    },
    {
      'text-green-600': state === 'success',
    }
  );

  const descriptorId = name + '-descriptor-' + value;

  return (
    <div className={className}>
      <div>
        <label className="text-sm font-bold text-gray-700 block" htmlFor={name}>
          {label}
          {required && '*'}
        </label>
        {!required && <span className="text-sm text-gray-500">Optional</span>}
      </div>

      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          required={required}
          type={type}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          disabled={disabled}
          className={inputClasses}
        />
        {/* {state === 'error' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              key={"test"}
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )} */}
      </div>
      {helpers && helpers?.length > 0 && (
        <div className={helperClasses} >
          {helpers.map(h => h)}
        </div>
      )}
      {subtitle}
    </div>
  );
};
