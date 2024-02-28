import { Icon, IconName } from '..';

export interface AlertProps {
  colorScheme?: keyof typeof AlertColors;
  className?: string;
  description?: React.ReactNode;
  icon?: IconName | React.JSX.Element;
  title?: React.ReactNode;
}

const AlertColors = {
  pink: {
    backgroundColor: 'bg-pink-100',
    borderColor: 'border-l-3 border-pink-700',
    color: 'text-[#4B5563]',
    icon: 'fill-pink-700',
  },
};

export const Alert: React.FC<AlertProps> = ({
  className = '',
  colorScheme = 'pink',
  description,
  icon,
  title,
  ...props
}) => {
  const alertColor = AlertColors[colorScheme];
  return (
    <div
      {...props}
      className={`flex flex-row gap-sm p-md rounded ${alertColor.backgroundColor} ${alertColor.borderColor} ${className}`}
    >
      {typeof icon === 'string' ? <Icon name={icon as IconName} /> : icon}
      <div className="flex flex-col gap-xs">
        {title && (
          <div className="text-base font-bold leading-[1.3]">{title}</div>
        )}
        {description && (
          <div className={`text-sm leading-[1.1375] tracking-[0.035rem] ${alertColor.color}`}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
