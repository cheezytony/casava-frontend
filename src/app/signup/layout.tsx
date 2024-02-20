'use client';

import React from 'react';
import { SignupHeader } from './header';
import { SignupFooter } from './footer';
import { OnboardingContextProvider } from '@/contexts/OnboardingContext';

export default function SignupLayout({ children }: React.PropsWithChildren) {
  return (
    <OnboardingContextProvider>
      <div className="pb-[5.3125rem] pt-[65px]">
        <SignupHeader />
        <main className="px-md py-xl max-w-[1200px] mx-auto w-full">
          {children}
        </main>
        <SignupFooter />
      </div>
    </OnboardingContextProvider>
  );
};