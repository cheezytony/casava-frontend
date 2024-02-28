'use client';

import {
  Avatar,
  CustomMiddleware,
  Heading,
  Tabs,
  Tag,
  Width,
} from '@/components';
import { useOnboarding } from '@/hooks';
import React from 'react';
import { Plan, PlanCoverage } from './plan';
import { PlanFrequency } from '../../../../types';
import { PlanFaqs } from './faqs';
import GetInTouch from './get-in-touch';

export default function SignupPlanPage() {
  const previousPage = '/signup/profile';
  const {
    customer,

    plan,
    setPlan,
    
    planFrequency,
    setPlanFrequency,

    setPreviousPage,
    setProgress,
  } = useOnboarding();
  const middleware = () => !!customer;

  const [showCoverage, setShowCoverage] = React.useState(false);
  const plans: Plan[] = [
    {
      id: '1',
      name: 'Seed Plan',
      price: 1800,
    },
    {
      id: '2',
      name: 'Seed Plan',
      price: 1800,
    },
    {
      id: '3',
      name: 'Seed Plan',
      price: 1800,
    },
  ];
  
  React.useEffect(() => {
    setPreviousPage(previousPage);
    setProgress(30);
    return () => {
      setPreviousPage(null);
      setProgress(0);
    };
  }, [setPreviousPage, setProgress]);

  return (
    <CustomMiddleware middleware={middleware} redirectTo={previousPage}>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-md items-center text-center mb-sm">
          <Avatar size="xl" />
          <Heading as="h2" level={2}>
            Choose a <span className="text-pink-700">Health Plan</span>{' '}
            <br className="hidden md:block" />
            that works for You
          </Heading>
        </div>

        <Width max={682} className="mx-auto mb-lg">
          <Tabs
            className='flex-wrap lg:flex-nowrap'
            activeKey={planFrequency}
            onChange={(key) => setPlanFrequency(key as PlanFrequency)}
            items={[
              {
                key: 'monthly',
                label: 'Monthly payment',
              },
              {
                key: 'quarterly',
                label: (
                  <div className="flex gap-sm items-center">
                    <span>Quarterly payment</span>
                    <Tag colorScheme="gray">Save 10%</Tag>
                  </div>
                ),
              },
              {
                key: 'annual',
                label: (
                  <div className="flex gap-sm items-center">
                    <span>Annual payment</span>
                    <Tag colorScheme="gray">Save 20%</Tag>
                  </div>
                ),
              },
            ]}
          />
        </Width>

        <Width className="gap-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-[68px]">
          {plans.map((p, index) => (
            <Plan
              key={p.id}
              name={p.name}
              price={p.price}
              frequency={planFrequency}
              isSelected={p.id === plan?.id}
              onClick={() => {
                setPlan(p);
                setShowCoverage(true);
              }}
              onShowCoverage={() => setShowCoverage(true)}
            />
          ))}
        </Width>
        
        <div className="flex flex-col items-center gap-[132px]">
          {showCoverage && <PlanCoverage />}
          <PlanFaqs />
          <GetInTouch />
        </div>
      </div>
    </CustomMiddleware>
  );
}
