import React from 'react';
import { Icon, Paragraph } from '..';

export type AccordionValue = number | null | Array<number>;

export interface AccordionProps {
  activeIndex?: AccordionValue;
  allowToggle?: boolean;
  allowMultiple?: boolean;
  items: AccordionItem[];
  onChange?: (index: AccordionValue) => void;
}

export interface AccordionItem {
  label: React.ReactNode;
  content: React.ReactNode;
}

export const Accordion = ({
  activeIndex,
  allowMultiple = false,
  allowToggle = false,
  items,
  onChange,
}: AccordionProps) => {
  const [index, setIndex] = React.useState<AccordionValue>(
    activeIndex ?? (allowMultiple ? [] : null)
  );
  const updateIndex = React.useCallback(
    (previousIndex: AccordionValue, i: number) => {
      if (allowMultiple) {
        const previous = previousIndex as number[];
        if (allowToggle) {
          return previous.includes(i)
            ? previous.filter((index) => index !== i)
            : [...previous, i];
        }
        return previous.includes(i) ? previous : [...previous, i];
      }
      if (allowToggle) {
        return previousIndex === i ? null : i;
      }
      return i;
    }
  , [allowMultiple, allowToggle]);
  const handleItemClick = (i: number) => {
    const newIndex = updateIndex(index, i);
    if (newIndex !== index) {
      setIndex(newIndex);
      onChange?.(newIndex);
    }
  };
  const isSelected = (i: number) => {
    if (allowMultiple) {
      return (index as number[]).includes(i);
    }
    return index === i;
  };

  React.useEffect(() => {
    setIndex(activeIndex ?? (allowMultiple ? [] : null));
  }, [activeIndex, allowMultiple, allowToggle]);

  return (
    <div className="flex flex-col gap-[24px]">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div className="overflow-hidden">
            <div
              className="cursor-pointer flex gap-[24px] items-center"
              onClick={() => handleItemClick(i)}
            >
              <Paragraph className="font-semibold" size="xl">
                {item.label}
              </Paragraph>
              <span className="ml-auto">
                <Icon
                  className="text-[#808080]"
                  name={isSelected(i) ? 'IconMinusCircle' : 'IconPlusCircle'}
                />
              </span>
            </div>
            <div
              className={`grid transition-[grid-template-rows] overflow-hidden ${
                isSelected(i) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0">
                <div className={'pt-[8px]'}>{item.content}</div>
              </div>
            </div>
          </div>
          {i < items.length - 1 && <hr className="mb-[8px]" />}
        </React.Fragment>
      ))}
    </div>
  );
};
