'use client';

import {
  AutoInsuranceProduct,
  DeviceInsuranceProduct,
  GoodsInTransitProduct,
  HealthCashProduct,
  HealthInsuranceProduct,
  TravelInsuranceProduct,
} from './products';
import { Avatar, Card, Heading, Paragraph } from '@/components';
import { useOnboarding } from '@/hooks/onboarding';
import { InsuranceProduct } from '../../../types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const {
    insuranceProduct,
    setInsuranceProduct,
    setPreviousPage,
    setProgress,
  } = useOnboarding();

  const chooseProduct = (product: InsuranceProduct) => {
    setInsuranceProduct(product);
    router.push('/signup/hospital');
  };

  useEffect(() => {
    setPreviousPage(null);
    setProgress(0);
  }, [setPreviousPage, setProgress]);

  return (
    <div className="max-w-fit mx-auto">
      <div className="flex flex-col gap-md items-center text-center mb-lg">
        <Avatar size="xl" />
        <Heading as="h2" level={2}>
          Hi! <span className="text-pink-700">I&apos;m Funmi</span>, your health
          partner at Casava. <br className="hidden md:block" />
          Let&apos;s get you covered.
        </Heading>
        <Paragraph size="xl">Select a policy to proceed.</Paragraph>
      </div>
      <Card size="lg" className="grid place-items-center">
        <div className={`gap-lg grid w-fit sm:grid-cols-2 lg:grid-cols-3`}>
          <HealthInsuranceProduct
            isSelected={insuranceProduct === 'health'}
            onClick={() => chooseProduct('health')}
          />
          <HealthCashProduct
            isSelected={insuranceProduct === 'health-cash'}
            onClick={() => chooseProduct('health-cash')}
          />
          <AutoInsuranceProduct
            isSelected={insuranceProduct === 'auto'}
            onClick={() => chooseProduct('auto')}
          />
          <DeviceInsuranceProduct
            isSelected={insuranceProduct === 'device'}
            onClick={() => chooseProduct('device')}
          />
          <GoodsInTransitProduct
            isSelected={insuranceProduct === 'goods-in-transit'}
            onClick={() => chooseProduct('goods-in-transit')}
          />
          <TravelInsuranceProduct
            isSelected={insuranceProduct === 'travel'}
            onClick={() => chooseProduct('travel')}
          />
        </div>
      </Card>
      {/* <SmallLoader /> */}
    </div>
  );
}
