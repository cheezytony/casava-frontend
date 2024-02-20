import {
  FloatingFocusManager,
  FloatingList,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useInteractions,
  useListNavigation,
  useRole,
} from '@floating-ui/react';
import React, { useEffect, useMemo } from 'react';
import { FormInputWrapper, InputPlaceholder } from './input';
import { IconName } from '../icons';

export interface SelectOption {
  title: string;
  value: string | number;
}

export type SelectProps = React.HTMLAttributes<HTMLDivElement> & {
  leftIcon?: IconName | React.ReactNode;
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
  const nodeId = useFloatingNodeId();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const [inputValue, setInputValue] = React.useState<
    SelectOption['value'] | null
  >(null);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === inputValue),
    [options, inputValue]
  );
  const selectOption = (newValue: SelectOption['value']) => {
    setInputValue(newValue);
    setIsOpen(false);
    onChange?.(newValue);
  };

  const elementsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    nodeId,
    strategy,
    placement: 'bottom-start',
    transform: false,
    open: isOpen,
    middleware: [offset({ mainAxis: 10, alignmentAxis: 0 }), flip(), shift()],
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context, { bubbles: true });
  const click = useClick(context, {
    event: 'mousedown',
    toggle: true,
    ignoreMouse: false,
  });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, listNavigation, role, dismiss]
  );

  useEffect(() => {
    setInputValue(value ?? null);
  }, [value]);

  return (
    <React.Fragment>
      <FormInputWrapper
        leftIcon={leftIcon}
        rightIcon={isOpen ? 'IconChevronUp' : 'IconChevronDown'}
        ref={refs.setReference}
        role="button"
        tabIndex={0}
        {...getReferenceProps(getItemProps(props))}
      >
        {selectedOption ? (
          <span>{selectedOption.title}</span>
        ) : (
          <span className={InputPlaceholder.custom}>{placeholder}</span>
        )}
      </FormInputWrapper>
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        <FloatingFocusManager
          context={context}
          modal={false}
          initialFocus={0}
          returnFocus={true}
        >
          <div
            ref={refs.setFloating}
            className={`bg-white border-0 border-transparent duration-300 transition rounded-xs py-xs shadow-dialog-menu z-dialog-menu w-full max-w-[350px] ${
              !isOpen ? 'invisible opacity-0 translate-y-4' : ''
            }`}
            aria-expanded={isOpen}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {options?.map((item, itemIndex) => {
              return (
                <button
                  {...getItemProps({
                    ...item,
                    onClick: () => selectOption(item.value),
                  })}
                  ref={(element: HTMLButtonElement) =>
                    (elementsRef.current[itemIndex] = element)
                  }
                  key={`dropdown-item-${itemIndex}`}
                  className="appearance-none flex py-xs px-md text-base text-black text-opacity-[0.65] outline-none rounded w-full focus:bg-[#f5f5f5]"
                  role="menuitem"
                  type='button'
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </FloatingFocusManager>
      </FloatingList>
    </React.Fragment>
  );
};
