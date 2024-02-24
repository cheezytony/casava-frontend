'use client';

import {
  AutoInsuranceProduct,
  DeviceInsuranceProduct,
  GoodsInTransitProduct,
  HealthCashProduct,
  HealthInsuranceProduct,
  ProductProps,
  TravelInsuranceProduct,
} from './products';
import { Avatar, Card, Heading, Paragraph } from '@/components';
import { useOnboarding } from '@/hooks/onboarding';
import { InsuranceProduct } from '../../../types';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const {
    insuranceProduct,
    setCanGoForward,
    setInsuranceProduct,
    setNextPage,
    setPreviousPage,
    setProgress,
  } = useOnboarding();

  const chooseProduct = (product: InsuranceProduct) => {
    setInsuranceProduct(product);
  };

  useEffect(() => {
    setPreviousPage(null);
    setProgress(0);
    setNextPage('/signup/hospital');
  }, [setNextPage, setPreviousPage, setProgress]);

  React.useEffect(() => {
    setCanGoForward(!!insuranceProduct);
  }, [insuranceProduct, setCanGoForward]);
  
  const products: Array<{
    slug: InsuranceProduct;
    component: React.FC<ProductProps>;
    enabled: boolean;
  }> = [
    {
      slug: 'health',
      component: HealthInsuranceProduct,
      enabled: true,
    },
    {
      slug: 'health-cash',
      component: HealthCashProduct,
      enabled: true,
    },
    {
      slug: 'auto',
      component: AutoInsuranceProduct,
      enabled: false,
    },
    {
      slug: 'device',
      component: DeviceInsuranceProduct,
      enabled: false,
    },
    {
      slug: 'goods-in-transit',
      component: GoodsInTransitProduct,
      enabled: false,
    },
    {
      slug: 'travel',
      component: TravelInsuranceProduct,
      enabled: false,
    },
  ];
  const enabledProducts = products.filter((product) => product.enabled);
  const totalEnabledProducts = enabledProducts.length;

  return (
    <div className="flex flex-col gap-lg max-w-fit mx-auto">
      <div className="flex flex-col gap-md items-center text-center">
        <Avatar size="xl" />
        <Heading as="h2" level={2}>
          Hi! <span className="text-pink-700">I&apos;m Funmi</span>, your health
          partner at Casava. <br className="hidden md:block" />
          Let&apos;s get you covered.
        </Heading>
        <Paragraph size="xl">Select a policy to proceed.</Paragraph>
      </div>

      <Card size="lg" bodyClassName="grid place-items-center">
        <div
          className={`gap-lg grid w-fit  ${
            totalEnabledProducts >= 2 && 'sm:grid-cols-2'
          } ${totalEnabledProducts >= 3 && 'lg:grid-cols-3'}`}
        >
          {enabledProducts.map((product) => (
            <div key={product.slug}>
              {product.component({
                isSelected: insuranceProduct === product.slug,
                onClick: () => chooseProduct(product.slug),
              })}
            </div>
          ))}
        </div>
      </Card>
      {/* <SmallLoader /> */}
    </div>
  );
}
