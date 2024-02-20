import React from 'react';
import { ButtonOrLink } from '..';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  href?: string;
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
  const onClick = (item: TabItem) => {
    if (item.href && !item.content) return;
    setKey(item.key);
    onChange?.(item.key);
  };

  return (
    <div className={`flex flex-col gap-lg ${className}`}>
      <div className="bg-[#F2F2F7] border border-white border-opacity-70 flex gap-sm p-[6px] rounded-lg">
        {items?.map((item) => (
          <ButtonOrLink
            key={item.key}
            href={item.href}
            onClick={() => onClick(item)}
          >
            {item.label}
          </ButtonOrLink>
        ))}
      </div>
      <div></div>
    </div>
  );
};
