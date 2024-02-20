'use client';

import { Avatar, CustomMiddleware, Heading, Tabs } from '@/components';
import { useOnboarding } from '@/hooks';
import React from 'react';

export default function SignupPlanPage() {
  const previousPage = '/signup/profile';
  const {
    customer,

    setPreviousPage,
    setProgress,
  } = useOnboarding();
  const middleware = () => !!customer;

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
      <div>
        <div className="flex flex-col gap-md items-center text-center mb-lg">
          <Avatar size="xl" />
          <Heading as="h2" level={2}>
            Choose a <span className="text-pink-700">Health Plan</span>{' '}
            <br className="hidden md:block" />
            that works for You
          </Heading>
        </div>

        <Tabs
          items={[
            { key: 'monthly', label: 'Monthly payment' },
            {
              key: 'quarterly',
              label: (
                <div className="flex items-center">
                  <span>Quarterly payment</span>
                </div>
              ),
            },
            {
              key: 'annual',
              label: (
                <div className="flex items-center">
                  <span>Annual payment</span>
                </div>
              ),
            },
          ]}
        />
      </div>
    </CustomMiddleware>
  );
}
