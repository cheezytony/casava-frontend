import { HTMLAttributes } from 'react';
import { Card, FormRadio, Icon, Paragraph } from '@/components';

export interface HospitalProps extends HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  slug: string;
  cta?: React.ReactNode;
}

export const Hospital: React.FC<HospitalProps> = ({
  className = '',
  isSelected,
  slug,
  cta,
  ...props
}) => {
  return (
    <Card
      size="lg"
      className={`${
        isSelected ? 'border-pink-700' : ''
      } hover:border-pink-700 ${className}`}
      {...props}
    >
      <div className="flex flex-col gap-md">
        <div className="flex gap-sm">
          <div className="bg-pink-700 shrink-0 text-white rounded-full grid place-items-center w-[100px] h-[100px]">
            <div className="font-serif text-[32px] leading-[1.115] font-bold">
              MH
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <Paragraph className="font-semibold" size="xl">
              Oneness Hospital
            </Paragraph>
            <Paragraph className="text-[#808080]" size="sm">
              Medical Clinic
            </Paragraph>
            <div className="flex gap-xs items-center">
              <Icon
                name="IconStethoscope"
                size={11}
                className="text-[#808080]"
              />
              <Paragraph className="text-[#808080]" size="sm">
                28 years Experience
              </Paragraph>
            </div>
            <div className="flex gap-xs items-center">
              <Icon name="IconStar" size={12} className="text-primary-tan" />
              <Paragraph className="text-[#808080] text-opacity-50" size="sm">
                4.5 (290 reviews)
              </Paragraph>
            </div>
          </div>
          <div className="ml-auto shink-0">
            {cta ? (
              cta
            ) : (
              <FormRadio
                isChecked={isSelected}
                className="pointer-events-none"
                name={slug}
              />
            )}
          </div>
        </div>
        <hr className="border-[#F2F2F7]" />
        <div className="flex flex-col gap-sm">
          <div className="flex gap-xs items-center">
            <Icon
              name="IconLocationPinAlt"
              size="xs"
              className="text-[#808080]"
            />
            <Paragraph className="font-semibold" size="sm">
              9 Fakored Street by Okesuna bus-stop, off Abiodun St, Shomolu
            </Paragraph>
          </div>
          <div className="flex gap-xs items-center">
            <Icon
              name="IconLocationPinAlt"
              size="xs"
              className="text-[#808080]"
            />
            <Paragraph className="text-[#808080]" size="sm">
              Open 24 hours
            </Paragraph>
          </div>
        </div>
      </div>
    </Card>
  );
};
