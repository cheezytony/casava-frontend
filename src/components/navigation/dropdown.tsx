'use client';

import {
  useFloating,
  Placement,
  autoUpdate,
  FloatingPortal,
  FloatingArrow,
  offset,
  flip,
  shift,
  useListNavigation,
  useInteractions,
  useFloatingNodeId,
  useClick,
  arrow,
  useRole,
  useDismiss,
  useTypeahead,
  FloatingList,
  FloatingFocusManager,
  useMergeRefs,
} from '@floating-ui/react';
import * as React from 'react';
import { ButtonOrLink } from '..';
import { Divider } from '../layout';

export const DropdownContext = React.createContext<{
  isOpen: boolean;
  activeIndex: number | null;
}>({
  isOpen: false,
  activeIndex: null,
});

export interface DropdownProps {
  // The label is the element that will be used to trigger the dropdown.
  label?: JSX.Element;
  // The children is/are the element(s) that will be used to trigger the dropdown if no label is provided.
  children?: JSX.Element;
  // The items are the elements that will be displayed in the dropdown.
  items?: Array<Array<DropdownItemProps>>;
  // The placement is the position of the dropdown relative to the trigger.
  placement?: Placement;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  children,
  placement = 'bottom-start',
  items = [],
}) => {
  const nodeId = useFloatingNodeId();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const arrowRef = React.useRef(null);
  const elementsRef = React.useRef<
    Array<HTMLButtonElement & HTMLAnchorElement>
  >([]);
  const labelsRef = React.useRef<Array<string | null>>([]);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    nodeId,
    placement,
    strategy: 'fixed',
    transform: false,
    open: isOpen,
    middleware: [
      offset({ mainAxis: 10, alignmentAxis: 0 }),
      flip(),
      shift(),
      arrow({ element: arrowRef }),
    ],
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
  const typeahead = useTypeahead(context, {
    // @ts-ignore
    listRef: elementsRef,
    activeIndex,
    onMatch: isOpen ? setActiveIndex : undefined,
    findMatch(list, typedString) {
      return list.find((item) => {
        if (
          item?.constructor === HTMLButtonElement ||
          item?.constructor === HTMLAnchorElement
        ) {
          return (item as HTMLElement).innerText
            .toLowerCase()
            .startsWith(typedString);
        }
        return item?.includes(typedString);
      });
    },
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, listNavigation, role, dismiss, typeahead]
  );

  return (
    <React.Fragment>
      {React.cloneElement(label ?? (children as React.ReactElement), {
        ref: useMergeRefs([refs.setReference]),
        ...getReferenceProps(getItemProps()),
      })}
      <FloatingPortal>
        <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={0}
            returnFocus={false}
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
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className="fill-white"
              />
              <DropdownContext.Provider value={{ isOpen, activeIndex }}>
                {items.map((group, groupIndex) => (
                  <div key={`dropdown-item-group-${groupIndex}`}>
                    {groupIndex > 0 && <Divider size='sm' />}
                    {group?.map((item, itemIndex) => {
                      const currentIndex =
                        itemIndex + (items[groupIndex - 1]?.length ?? 0);
                      return (
                        <ButtonOrLink
                          key={`dropdown-item-${groupIndex}-${itemIndex}`}
                          {...getItemProps({
                            onClick: (event) => {
                              event.preventDefault();
                              item.onClick?.();
                              setIsOpen(false);
                            },
                          })}
                          {...item}
                          ref={(
                            element: HTMLButtonElement & HTMLAnchorElement
                          ) => (elementsRef.current[currentIndex] = element)}
                          className="appearance-none flex py-xs px-md text-base text-black text-opacity-[0.65] outline-none rounded w-full focus:bg-[#f5f5f5]"
                        >
                          {item.label}
                        </ButtonOrLink>
                      );
                    })}
                  </div>
                ))}
              </DropdownContext.Provider>
            </div>
          </FloatingFocusManager>
        </FloatingList>
      </FloatingPortal>
    </React.Fragment>
  );
};

export interface DropdownItemProps {
  label: React.ReactNode;
  onClick?: () => void;
}
