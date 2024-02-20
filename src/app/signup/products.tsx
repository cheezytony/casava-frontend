import { ReactNode } from 'react';
import { Heading, Paragraph } from '@/components';
import Image from 'next/image';

type BaseProductProps = {
  description: ReactNode;
  image: ReactNode;
  imageHeight?: number;
  imageWidth?: number;
  isSelected?: boolean;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

type ProductProps = React.HTMLAttributes<HTMLDivElement> & {
  isSelected?: boolean;
};

const Product: React.FC<BaseProductProps> = ({
  className,
  description,
  image,
  title,
  imageWidth,
  imageHeight,
  isSelected,
  ...props
}) => {
  return (
    <div
      className={`cursor-pointer flex flex-col items-start duration-300 group overflow-clip text-left p-lg relative rounded-[0.742rem] w-full hover:ring-1 hover:ring-pink-700 sm:max-w-[16.25rem] ${
        isSelected && 'ring-1 ring-pink-700'
      } ${className}`}
      {...props}
    >
      <div
        className={`duration-300 inline-block mb-[7.56rem] group-hover:scale-150 ${
          isSelected && 'scale-150'
        }`}
      >
        <svg
          width="23"
          height="32"
          viewBox="0 0 23 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0971 21.4056C14.0971 15.6181 10.5627 10.901 6.1377 10.7028C10.5627 10.5046 14.0971 5.78743 14.0971 0C14.0971 5.78743 17.6315 10.5046 22.0565 10.7028C17.6315 10.901 14.0971 15.6181 14.0971 21.4056Z"
            fill="#EF4972"
            stroke="#231F20"
            strokeWidth="0.593598"
            strokeMiterlimit="10"
          />
          <path
            d="M6.13753 32.0001C6.13753 28.264 3.85001 25.2117 1 25.0928C3.85939 24.964 6.13753 21.9216 6.13753 18.1855C6.13753 21.9216 8.42504 24.9739 11.2751 25.0928C8.41566 25.2216 6.13753 28.264 6.13753 32.0001Z"
            fill="#EF4972"
            stroke="#231F20"
            strokeWidth="0.593598"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <div
        className={`absolute duration-300 right-0 top-0 group-hover:scale-110 ${
          isSelected && 'scale-110'
        }`}
      >
        {image}
      </div>
      <div>
        <Heading as="h4" level={4} className="mb-[0.41675rem]">
          {title}
        </Heading>
        <Paragraph size="sm">{description}</Paragraph>
      </div>
    </div>
  );
};

export const HealthInsuranceProduct: React.FC<ProductProps> = (props) => {
  return (
    <Product
      title="Health Insurance"
      description="Enjoy affordable healthcare without breaking the bank."
      image={
        <Image
          src="/images/health-insurance-0.png"
          alt="Health Insurance"
          height={164.9}
          width={204.9 - 17}
          loading="lazy"
        />
      }
      className="bg-[#E7FFEC]"
      {...props}
    />
  );
};

export const HealthCashProduct: React.FC<ProductProps> = (props) => {
  return (
    <Product
      title="Health cash"
      description="Get cash back when you go to the hospital."
      image={
        <Image
          src="/images/health-cash-0.png"
          alt="Health cash"
          height={109.81}
          width={176}
          loading="lazy"
        />
      }
      className="bg-[#EBF4FF]"
      {...props}
    />
  );
};

export const AutoInsuranceProduct: React.FC<ProductProps> = (props) => {
  return (
    <Product
      title="Auto Insurance"
      description="Maintain financial protection for your vehicle."
      image={
        <Image
          src="/images/auto-insurance-0.png"
          alt="Auto Insurance"
          height={164}
          width={170.9 - 17}
          loading="lazy"
        />
      }
      imageWidth={171}
      {...props}
      imageHeight={164.16}
      className="bg-[#FFF8DB]"
    />
  );
};

export const DeviceInsuranceProduct: React.FC<ProductProps> = (props) => {
  return (
    <Product
      title="Device Insurance"
      description="Get financial protection if anything happens to your device"
      image={
        <Image
          src="/images/device-insurance-0.png"
          alt="Device Insurance"
          height={120}
          width={189 - 3}
          loading="lazy"
        />
      }
      className="bg-[#DBFFF6]"
      {...props}
    />
  );
};

export const GoodsInTransitProduct: React.FC<ProductProps> = (props) => {
  return (
    <Product
      title="Goods in Transit"
      description="Protect goods being transported from one location to another."
      image={
        <Image
          src="/images/goods-in-transit-0.png"
          alt="Goods in Transit"
          height={170}
          width={170}
          loading="lazy"
        />
      }
      className="bg-pink-100"
      {...props}
    />
  );
};

export const TravelInsuranceProduct: React.FC<ProductProps> = (props) => {
  return (
    <Product
      title="Travel Insurance"
      description="Mitigate the financial risks for various travel-related issues"
      image={
        <Image
          src="/images/travel-insurance-0.png"
          alt="Travel Insurance"
          height={170}
          width={170}
          loading="lazy"
        />
      }
      className="bg-green-100"
      {...props}
    />
  );
};
