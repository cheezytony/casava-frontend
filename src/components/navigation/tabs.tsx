import React from 'react';
import { ButtonOrLink } from '..';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  href?: string;
  openInNewTab?: boolean;
  content?: React.ReactNode;
  onClick?: () => void;
}

export interface TabsProps {
  activeKey?: string;
  className?: string;
  items?: Array<TabItem>;
  onChange?: (key: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  activeKey,
  className = '',
  items,
  onChange,
}: TabsProps) => {
  const [key, setKey] = React.useState(activeKey);
  const activeItem = items?.find((item) => item.key === key);
  const onClick = (item: TabItem) => {
    if (item.href && !item.content) return;
    setKey(item.key);
    onChange?.(item.key);
  };

  return (
    <div className={`flex flex-col gap-lg`}>
      <div className={`bg-[#F2F2F7] border border-white border-opacity-70 flex gap-sm p-[6px] rounded-lg ${className}`}>
        {items?.map((item) => (
          <ButtonOrLink
            key={item.key}
            href={item.href}
            target={item.openInNewTab ? '_blank' : undefined}
            className={`font-semibold text-center px-[14px] py-[10px] rounded-lg ${
              activeItem === item
                ? 'bg-white text-pink-700 shadow-active-tab-option'
                : 'text-[#667085]'
            }`}
            onClick={() => onClick(item)}
          >
            {item.label}
          </ButtonOrLink>
        ))}
      </div>
      {activeItem?.content && <div>{activeItem?.content}</div>}
    </div>
  );
};
