'use client';

import React from 'react';
import { SignupHeader } from './header';
import { SignupFooter } from './footer';
import { OnboardingContext, OnboardingNextAction } from '@/contexts/OnboardingContext';
import { InsuranceProduct, PlanFrequency } from '../../../types';

export default function SignupLayout({ children }: React.PropsWithChildren) {
  const [isFlush, setIsFlush] = React.useState(false);
  const [canRestart, setCanRestart] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previousPage, setPreviousPage] = React.useState<string | null>(null);
  const [nextAction, setNextAction] = React.useState<OnboardingNextAction | null>(null)
  const canShowFooter = React.useMemo(() => !!nextAction, [nextAction]);

  const [insuranceProduct, setInsuranceProduct] =
    React.useState<InsuranceProduct | null>(null);
  const [state, setState] = React.useState<any>('');
  const [lga, setLga] = React.useState<any>(null);
  const [hospital, setHospital] = React.useState<any>(null);
  const [customer, setCustomer] = React.useState<Customer | null>(null);

  const [beneficiaries, setBeneficiaries] = React.useState<Beneficiary[]>([]);
  const addBeneficiary = (beneficiary: Beneficiary) => {
    setBeneficiaries((prev) => [...prev, beneficiary]);
  };
  const removeBeneficiary = (index: number) => {
    setBeneficiaries((prev) => prev.filter((_, i) => i !== index));
  };
  const updateBeneficiary = (index: number, beneficiary: Beneficiary) => {
    setBeneficiaries((prev) =>
      prev.map((b, i) => (i === index ? beneficiary : b))
    );
  };

  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [planFrequency, setPlanFrequency] =
    React.useState<PlanFrequency>('monthly');

  const restart = () => {
    setCanRestart(false);
    setProgress(0);
    setPreviousPage(null);
    setNextAction(null);
    setInsuranceProduct(null);
    setState('');
    setLga(null);
    setHospital(null);
    setBeneficiaries([]);
  };
  
  return (
    <OnboardingContext.Provider
      value={{
        isFlush,
        setIsFlush,

        canShowFooter,

        canRestart,
        setCanRestart,
        restart,

        progress,
        setProgress,

        previousPage,
        setPreviousPage,

        nextAction,
        setNextAction,

        insuranceProduct,
        setInsuranceProduct,

        state,
        setState,

        lga,
        setLga,

        hospital,
        setHospital,

        customer,
        setCustomer,

        beneficiaries,
        addBeneficiary,
        removeBeneficiary,
        updateBeneficiary,

        plan,
        setPlan,

        planFrequency,
        setPlanFrequency,
      }}
    >
      <div className={`${!!canShowFooter ? 'pb-[5.3125rem]' : ''} pt-[65px]`}>
        <SignupHeader />

        <main
          className={`w-full ${
            !isFlush ? 'max-w-[1200px] mx-auto px-md py-xl' : ''
          }`}
        >
          {children}
        </main>
        <SignupFooter />
      </div>
    </OnboardingContext.Provider>
  );
}
