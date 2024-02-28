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
  FloatingFocusManager,
  useMergeRefs,
  useTransitionStyles,
} from '@floating-ui/react';
import * as React from 'react';
import { Divider } from '../layout';
import { DropdownItemProps, Icon, IconProps, Popper } from '..';
import { UsesDisclosure } from '@/hooks';

export interface DropdownProps extends Partial<UsesDisclosure> {
  // The label is the element that will be used to trigger the dropdown.
  label?: JSX.Element;
  // The children is/are the element(s) that will be used to trigger the dropdown if no label is provided.
  children?: JSX.Element;
  // The items are the elements that will be displayed in the dropdown.
  items?: Array<Array<DropdownItemProps>>;
  // The placement is the position of the dropdown relative to the trigger.
  placement?: Placement;
  // The selectedIndex is the index of the item that will be selected by default.
  selectedIndex?: number;
}
export const Menu: React.FC<DropdownProps> = ({
  label,
  children,
  placement = 'bottom-start',
  items = [],
  selectedIndex,
}) => {
  const nodeId = useFloatingNodeId();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const arrowRef = React.useRef(null);
  const elementsRef = React.useRef<Array<HTMLElement | null>>([]);
  const isTypingRef = React.useRef(false);

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

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 300,
    initial: {
      opacity: 0,
      transform: 'translateY(10px)',
    },
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
    selectedIndex,
    loop: true,
    onNavigate: setActiveIndex,
  });
  const typeahead = useTypeahead(context, {
    // @ts-ignore
    listRef: elementsRef,
    activeIndex,
    loop: true,
    onMatch: isOpen ? setActiveIndex : undefined,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
    findMatch(list, typedString) {
      return list.find((item) => {
        if (item?.constructor === HTMLDivElement) {
          return (item as HTMLDivElement).innerText
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
        ...getReferenceProps(getItemProps({ tabIndex: 0 })),
      })}
      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              className={`outline-none z-dialog-menu`}
              aria-expanded={isOpen}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              <div
                className="bg-white border-0 border-transparent overflow-y-auto overflow-x-clip shadow-dialog-menu rounded-lg py-[5px] px-[10px] max-w-[350px] max-h-[250px]"
                style={{ ...styles }}
              >
                <FloatingArrow
                  ref={arrowRef}
                  context={context}
                  className="fill-white"
                />

                {items.map((group, groupIndex) => (
                  <div key={`dropdown-item-group-${groupIndex}`}>
                    {groupIndex > 0 && <Divider size="sm" />}
                    {group?.map((item, itemIndex) => {
                      const currentIndex =
                        itemIndex + (items[groupIndex - 1]?.length ?? 0);
                      return (
                        <div
                          key={`dropdown-item-${groupIndex}-${itemIndex}`}
                          {...getItemProps({
                            onClick: (event) => {
                              item.onClick?.();
                              setIsOpen(false);
                            },
                            onKeyDown(event) {
                              if (event.key === 'Enter') {
                                item.onClick?.();
                                setIsOpen(false);
                              }

                              if (event.key === ' ' && !isTypingRef.current) {
                                item.onClick?.();
                                setIsOpen(false);
                              }
                            },
                          })}
                          tabIndex={activeIndex === itemIndex ? 0 : -1}
                          ref={(element) =>
                            (elementsRef.current[currentIndex] = element)
                          }
                          role="option"
                          aria-selected={
                            itemIndex === selectedIndex ? 'true' : 'false'
                          }
                          className="cursor-pointer flex py-xs px-md text-base text-black text-opacity-[0.65] outline-none rounded w-full focus:bg-pink-100 aria-selected:bg-pink-700 aria-selected:text-white disabled:opacity-50 disabled:pointer-events-none"
                          {...(item.isDisabled && { disabled: true })}
                        >
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </React.Fragment>
  );
};
