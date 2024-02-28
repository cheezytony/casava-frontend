import {
  OffsetOptions,
  OpenChangeReason,
  Placement,
  SizeOptions,
  Strategy,
  UseListNavigationProps,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useHover,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStyles,
} from '@floating-ui/react';
import React from 'react';

type InteractionProps = ReturnType<typeof useInteractions>;
type FloatingProps = ReturnType<typeof useFloating>;

export interface PopperProps {
  label: (props: PopperReferenceProps) => React.ReactNode;
  content: (props: PopperFloatingProps) => React.ReactNode;

  isOpen?: boolean;
  strategy?: Strategy;
  placement?: Placement;
  transform?: boolean;
  offsetConfig?: OffsetOptions;
  flipOnOverflow?: boolean;
  shiftOnOverflow?: boolean;
  floatingSize?: SizeOptions;

  enableRole?: boolean;
  enableDismiss?: boolean;
  enableClick?: boolean;
  enableHover?: boolean;
  enableListNavigation?: boolean;

  listNavigationConfig?: Partial<UseListNavigationProps>;
  roleConfig?: Parameters<typeof useRole>[1];
  transitionConfig?: Parameters<typeof useTransitionStyles>[1];

  onOpen?: (event?: Event, reason?: OpenChangeReason) => void;
  onClose?: (event?: Event, reason?: OpenChangeReason) => void;
}

export type PopperReferenceProps = {
  isOpen: boolean;
  ref: FloatingProps['refs']['setReference'];
  getReferenceProps: InteractionProps['getReferenceProps'];
  getItemProps: InteractionProps['getItemProps'];
};

export type PopperFloatingProps = {
  isOpen: boolean;
  isMounted: boolean;
  activeIndex: number | null;
  context: FloatingProps['context'];
  floatingStyles: React.CSSProperties;
  transitionStyles: React.CSSProperties;
  listRef: React.MutableRefObject<Array<HTMLElement | null>>;
  isTypingRef: React.MutableRefObject<boolean>;
  ref: FloatingProps['refs']['setFloating'];
  getFloatingProps: InteractionProps['getFloatingProps'];
  getItemProps: InteractionProps['getItemProps'];
};

export const Popper: React.FC<PopperProps> = ({
  label,
  content,

  strategy = 'fixed',
  placement = 'bottom',
  transform = false,
  isOpen = false,
  offsetConfig,
  flipOnOverflow = true,
  shiftOnOverflow = true,
  floatingSize,
  listNavigationConfig,
  roleConfig,
  transitionConfig,

  enableRole = true,
  enableDismiss = true,
  enableClick = true,
  enableHover = false,
  enableListNavigation = false,

  onClose,
  onOpen,
  ...props
}) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const nodeId = useFloatingNodeId();
  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const isTypingRef = React.useRef(false);

  const { refs, floatingStyles, context } = useFloating<HTMLElement>({
    nodeId,
    strategy,
    placement,
    transform,
    open: isOpen,
    middleware: [
      offset(offsetConfig),
      flipOnOverflow && flip(),
      shiftOnOverflow && shift(),
      size(floatingSize),
    ].filter(Boolean),
    onOpenChange: (value, event, reason) => {
      value ? onOpen?.(event, reason) : onClose?.(event, reason);
    },
    whileElementsMounted: autoUpdate,
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(
    context,
    transitionConfig,
  );
  const role = useRole(context, {
    enabled: enableRole,
    ...roleConfig,
  });
  const dismiss = useDismiss(context, {
    enabled: enableDismiss,
    bubbles: true,
  });
  const click = useClick(context, {
    enabled: enableClick,
    event: 'mousedown',
    toggle: true,
    ignoreMouse: false,
  });
  const hover = useHover(context, {
    enabled: enableHover,
  });
  const listNavigation = useListNavigation(context, {
    enabled: enableListNavigation,
    listRef,
    activeIndex,
    loop: true,
    onNavigate: setActiveIndex,
    ...listNavigationConfig,
  });
  
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, listNavigation, role, dismiss, hover]
  );

  return (
    <>
      {label({
        isOpen,
        ref: refs.setReference,
        getReferenceProps,
        getItemProps,
      })}
      {content({
        isOpen,
        isMounted,
        context,
        floatingStyles,
        transitionStyles,
        activeIndex,
        listRef,
        isTypingRef,
        ref: refs.setFloating,
        getFloatingProps,
        getItemProps,
      })}
    </>
  );
};
