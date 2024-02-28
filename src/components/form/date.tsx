import React from 'react';
import { DateTimeFormat, dateTimeFormat } from '@/utils';
import { FormInputWrapper, FormInputWrapperProps, Icon, FormInputPlaceholder, Popper } from '..';
import { Datepicker, DatepickerProps } from '../display/datepicker';

export interface FormDateProps
  extends DatepickerProps,
    Omit<FormInputWrapperProps, 'onChange' | 'as'> {
  placeholder?: string;
  format?: DateTimeFormat;
  onChange?: DatepickerProps['onChange'];
}

export const FormDate: React.FC<FormDateProps> = ({
  placeholder = 'Select a date',
  value,
  format = 'date:compact',
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>();
  const handleSelect = (date: Date | null) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };
  const handleCancel = () => setIsOpen(false);
 
  return (
    <Popper
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      label={({ isOpen, ref, getReferenceProps, getItemProps }) => (
        <FormInputWrapper
          {...getReferenceProps(getItemProps({}))}
          ref={ref}
          rightIcon={
            <Icon
              name="IconChevronDown"
              className={`duration-150 ${isOpen ? '-rotate-180' : ''}`}
            />
          }
          className="cursor-pointer select-none"
          tabIndex={0}
          role="button"
        >
          {selectedDate ? (
            <div>{dateTimeFormat(selectedDate, format)}</div>
          ) : (
            <FormInputPlaceholder text={placeholder} />
          )}
        </FormInputWrapper>
      )}
      content={({
        isMounted,
        floatingStyles,
        transitionStyles,
        ref,
        getFloatingProps,
        getItemProps,
      }) =>
        isMounted && (
          <div
            {...getFloatingProps(getItemProps())}
            className="z-dialog-menu outline-none"
            style={floatingStyles}
            ref={ref}
          >
            <div style={transitionStyles}>
              <Datepicker
                {...props}
                type="single"
                value={selectedDate}
                onChange={(value) => handleSelect(value as Date)}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )
      }
      floatingSize={{
        apply: ({ elements, availableWidth }) => {
          Object.assign(elements.floating.style, {
            width: `${322}px`,
            maxWidth: `${availableWidth}px`,
          });
        },
      }}
      transitionConfig={{
        duration: 75,
        initial: {
          opacity: 0,
          transform: 'translateY(10px)',
        },
      }}
    />
  );
};
