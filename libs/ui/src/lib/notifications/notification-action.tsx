import classNames from 'classnames';

export interface NotificationActionProps {
  title: string;
  style?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const NotificationAction = (props: NotificationActionProps) => {
  const { title, style = 'primary', onClick } = props;

  const classes = classNames(
    'bg-white rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'text-gray-600 hover:text-gray-500 focus:ring-gray-500':
        style === 'primary',
    },
    {
      'text-gray-500 hover:text-gray-400 focus:ring-gray-400':
        style === 'secondary',
    }
  );

  return (
    <button type="button" className={classes} onClick={onClick}>
      {title}
    </button>
  );
};
