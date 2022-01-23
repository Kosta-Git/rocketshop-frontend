import {
  XCircleIcon,
  ExclamationIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';

export interface AlertProps {
  title: string;
  content: string;
  status: 'error' | 'warning' | 'success' | 'info';
}

export const Alert = (props: AlertProps) => {
  const { title, content, status } = props;

  const cardClasses = classNames(
    'rounded-md p-4',
    {
      'bg-red-50': status === 'error',
    },
    {
      'bg-yellow-50': status === 'warning',
    },
    {
      'bg-green-50': status === 'success',
    },
    {
      'bg-blue-50': status === 'info',
    }
  );

  const titleClasses = classNames(
    'text-sm font-medium',
    {
      'text-red-800': status === 'error',
    },
    {
      'text-yellow-800': status === 'warning',
    },
    {
      'text-green-800': status === 'success',
    },
    {
      'text-blue-800': status === 'info',
    }
  );

  const contentClasses = classNames(
    'mt-2 text-sm',
    {
      'text-red-700': status === 'error',
    },
    {
      'text-yellow-700': status === 'warning',
    },
    {
      'text-green-700': status === 'success',
    },
    {
      'text-blue-700': status === 'info',
    }
  );

  return (
    <div className={cardClasses}>
      <div className="flex">
        <div className="flex-shrink-0">
          {status === 'error' && (
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
          {status === 'warning' && (
            <ExclamationIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          )}
          {status === 'success' && (
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
          {status === 'info' && (
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <h3 className={titleClasses}>{title}</h3>
          <div className={contentClasses}>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
