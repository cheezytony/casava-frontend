import React, { useLayoutEffect } from 'react';
import { Button, Heading, Icon, Paragraph, Text } from '..';
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
  useLayoutEffect(() => {
    if (isOpen && dialog.current) dialog.current.focus();
  }, [isOpen]);

  return (
    <FloatingPortal>
      <div
        ref={dialog}
        className={`fixed inset-0 grid place-items-center isolate overflow-y-auto  ${
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

export interface ConfirmProps
  extends Pick<
    ModalProps,
    | 'closeOnEscape'
    | 'closeOnOutsideClick'
    | 'closeOnSubmit'
    | 'isOpen'
    | 'onClose'
  > {
  title?: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: React.ReactNode;
  okText?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void | Promise<void> | (() => Promise<void>);
}

export const Confirm: React.FC<ConfirmProps> = ({
  title,
  description,
  cancelText = 'Cancel',
  okText = 'Ok',
  onCancel,
  onConfirm,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleOnConfirm = async () => {
    if (
      onConfirm instanceof (async () => {}).constructor ||
      onConfirm instanceof Promise
    ) {
      setIsLoading(true);
      await onConfirm();
      return setIsLoading(false);
    }
    onConfirm?.();
  };

  return (
    <Modal
      {...props}
      size="md"
      body={
        <div className="flex flex-col gap-lg">
          <div className="flex gap-md">
            <div className="bg-[#F5F5F5] h-[44px] w-[44px] rounded-full grid place-items-center shrink-0">
              <Icon name="IconAlertCircle" size={24} />
            </div>
            <div>
              <Paragraph size="lg" className="font-bold mb-xs">
                {title}
              </Paragraph>
              <Text as="p" size="sm" className="text-[#333333]">
                {description}
              </Text>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-md">
            <Button
              isDisabled={isLoading}
              colorScheme="gray"
              size="lg"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
            <Button isLoading={isLoading} size="lg" onClick={handleOnConfirm}>
              {okText}
            </Button>
          </div>
        </div>
      }
    />
  );
};
