import React from 'react';
import { Button, Heading, Icon, IconName, Paragraph } from '..';
import { FloatingPortal } from '@floating-ui/react';

export interface ModalProps {
  body?: React.ReactNode;
  className?: '';
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  closeOnSubmit?: boolean;
  footer?: React.ReactNode;
  heading?: React.ReactNode;
  isOpen?: boolean;
  size?: keyof typeof ModalSizes;
  subHeading?: React.ReactNode;
  onClose?: () => void;
}

const ModalSizes = {
  xs: '',
  sm: '',
  md: 'max-w-[480px] w-full',
  lg: '',
  full: '',
};

export const Modal: React.FC<ModalProps> = ({
  body,
  className = '',
  closeOnOutsideClick = true,
  closeOnEscape = true,
  footer,
  heading,
  isOpen,
  subHeading,
  size = 'md',
  onClose,
}) => {
  const modalSize = ModalSizes[size];

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (closeOnEscape) onClose?.();
    }
  };
  const handleOutsideClick = () => {
    if (closeOnOutsideClick) onClose?.();
  };

  const dialog = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isOpen && dialog.current) dialog.current.focus();
  }, [isOpen]);

  return (
    <FloatingPortal>
      <div
        ref={dialog}
        className={`fixed inset-0 grid place-items-center isolate overflow-y-auto z-overlay  ${
          isOpen ? 'dialog-open' : 'invisible pointer-events-none'
        }`}
        role="dialog"
        tabIndex={0}
        onKeyUp={onKeyUp}
      >
        <div
          className={`absolute inset-0 bg-black bg-opacity-85 cursor-pointer duration-300 ${
            !isOpen && 'invisible opacity-0 pointer-events-none'
          }`}
          onClick={handleOutsideClick}
        />
        <div
          className={`relative bg-white duration-300 rounded-lg p-lg flex flex-col gap-md ${modalSize} ${
            !isOpen && 'invisible opacity-0 scale-95 pointer-events-none'
          } ${className}`}
        >
          {(heading || subHeading) && (
            <div className="flex flex-col gap-xs">
              {heading && (
                <Heading as="h4" level={4}>
                  {heading}
                </Heading>
              )}
              {subHeading && <Paragraph size="sm">{subHeading}</Paragraph>}
            </div>
          )}
          {(body || footer) && (
            <div className="flex flex-col gap-md">
              {body}
              {footer}
            </div>
          )}
        </div>
      </div>
    </FloatingPortal>
  );
};

export interface AlertModalProps extends ModalProps {
  uuid?: string;
  type?: keyof typeof AlertModalIconColorSchemes;
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  showCancelButton?: boolean;
  onOk?: () => void | Promise<void> | (() => Promise<void>);
  onCancel?: () => void;
}

const AlertModalIcons: Record<
  keyof typeof AlertModalIconColorSchemes,
  IconName
> = {
  success: 'IconCheckmark',
  error: 'IconClose',
  warning: 'IconAlertCircle',
  info: 'IconBox',
};

const AlertModalIconColorSchemes = {
  success: 'bg-lightGreen-300 text-lightGreen-800',
  error: 'bg-pink-300 text-pink-800',
  warning: 'bg-pink-100 text-pink-700',
  info: 'bg-blue-100 text-blue-600',
};

export const AlertModal: React.FC<AlertModalProps> = ({
  type = 'info',
  title,
  description,
  okText = 'Okay',
  cancelText = 'Cancel',
  duration,
  showCancelButton,
  onOk,
  onClose,
  onCancel,
  ...props
}) => {
  const alertIcon = AlertModalIcons[type];
  const alertColorScheme = AlertModalIconColorSchemes[type];
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOnConfirm = async () => {
    if (
      onOk instanceof (async () => {}).constructor ||
      onOk instanceof Promise
    ) {
      setIsLoading(true);
      await onOk();
      return setIsLoading(false);
    }
    onOk?.();
  };

  const handleOnClose = () => onClose?.();

  React.useEffect(() => {
    let timeout = duration ? setTimeout(handleOnClose, duration) : undefined;
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Modal
      {...props}
      onClose={handleOnClose}
      body={
        <div className="flex flex-col gap-md items-center text-center">
          <div
            className={`h-[64px] w-[64px] grid place-items-center rounded-full ${alertColorScheme}`}
          >
            <Icon name={alertIcon} size={32} />
          </div>
          {title && (
            <Heading as="h3" level={3}>
              {title}
            </Heading>
          )}
          {description && (
            <Paragraph className="mb-md text-[#6B7280]">
              {description}
            </Paragraph>
          )}
          <div className="flex flex-col items-center gap-md md:flex-row w-full">
            {showCancelButton && (
              <Button
                className="w-full"
                isDisabled={isLoading}
                colorScheme="gray"
                size="lg"
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            )}
            <Button
              className="w-full"
              isLoading={isLoading}
              size="lg"
              onClick={handleOnConfirm}
            >
              {okText}
            </Button>
          </div>
        </div>
      }
    />
  );
};
