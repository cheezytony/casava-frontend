import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import React from 'react';
import { FormInputWrapper, FormInputPlaceholder } from './input';
import { Icon, IconName } from '../icons';
import { Popper } from '..';

export interface SelectOption {
  isDisabled?: boolean;
  label: React.ReactNode;
  value: string | number;
}

export type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  leftIcon?: IconName | React.JSX.Element;
  options?: SelectOption[];
  value?: string | number | null;
  placeholder?: string;
  strategy?: 'fixed' | 'absolute';
  onChange?: (value: string | number | null) => void;
};

export const FormSelect: React.FC<SelectProps> = ({
  leftIcon,
  options = [],
  placeholder = 'Select an option',
  strategy = 'fixed',
  value,
  onChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<
    SelectOption['value'] | null
  >(null);
  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === inputValue),
    [options, inputValue]
  );
  const selectedIndex = React.useMemo(
    () => options.findIndex((option) => option.value === inputValue),
    [options, inputValue]
  );
  const handleSelect = (newValue: SelectOption['value']) => {
    setInputValue(newValue);
    setIsOpen(false);
    onChange?.(newValue);
  };

  return (
    <Popper
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      enableListNavigation
      label={({ isOpen, ref, getReferenceProps, getItemProps }) => (
        <FormInputWrapper
          {...getReferenceProps(getItemProps(props))}
          leftIcon={leftIcon}
          rightIcon={
            <Icon
              name="IconChevronDown"
              className={`duration-150 ${isOpen ? '-rotate-180' : ''}`}
            />
          }
          ref={ref}
          role="button"
          tabIndex={0}
        >
          {selectedOption ? (
            <span>{selectedOption.label}</span>
          ) : (
            <FormInputPlaceholder text={placeholder} />
          )}
        </FormInputWrapper>
      )}
      content={({
        context,
        activeIndex,
        isMounted,
        floatingStyles,
        transitionStyles,
        listRef,
        isTypingRef,
        ref,
        getFloatingProps,
        getItemProps,
      }) =>
        isMounted && (
          <FloatingPortal>
            <FloatingFocusManager context={context} modal={false}>
              <div
                ref={ref}
                className={`outline-none z-dialog-menu`}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                <div
                  className="bg-white border-0 border-transparent rounded-lg max-h-[350px] overflow-y-auto overflow-x-clip shadow-dialog-menu py-[5px] px-[10px]"
                  style={{ ...transitionStyles }}
                >
                  {options?.map((item, itemIndex) => {
                    return (
                      <div
                        {...getItemProps({
                          ...item,
                          label: undefined,
                          onClick: () => handleSelect(item.value),
                          onKeyDown(event) {
                            if (event.key === 'Enter') {
                              event.preventDefault();
                              handleSelect(item.value);
                            }

                            if (event.key === ' ' && !isTypingRef.current) {
                              event.preventDefault();
                              handleSelect(item.value);
                            }
                          },
                        })}
                        ref={(element) => {
                          listRef.current[itemIndex] = element;
                        }}
                        key={`dropdown-item-${itemIndex}`}
                        className={`cursor-pointer flex py-xs px-md text-base outline-none rounded-[5px] w-full text-black focus:bg-pink-100 aria-selected:bg-pink-700 aria-selected:text-white aria-selected:focus:bg-pink-800 disabled:opacity-50 disabled:pointer-events-none`}
                        role="option"
                        aria-selected={
                          itemIndex === selectedIndex
                        }
                        tabIndex={activeIndex === itemIndex ? 0 : -1}
                        {...(item.isDisabled && { disabled: true })}
                      >
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )
      }
      floatingSize={{
        apply: ({ elements, rects }) => {
          Object.assign(elements.floating.style, {
            maxWidth: `${rects.reference.width}px`,
            minWidth: `${rects.reference.width}px`,
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
      listNavigationConfig={{
        selectedIndex,
      }}
    />
  );
};
