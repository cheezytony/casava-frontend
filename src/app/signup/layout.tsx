'use client';

import React from 'react';
import { SignupHeader } from './header';
import { SignupFooter } from './footer';
import { OnboardingContext } from '@/contexts/OnboardingContext';
import { InsuranceProduct, PlanFrequency } from '../../../types';

export default function SignupLayout({ children }: React.PropsWithChildren) {
  const [canRestart, setCanRestart] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [previousPage, setPreviousPage] = React.useState<string | null>(null);
  const [nextPage, setNextPage] = React.useState<string | null>(null);

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
    setNextPage(null);
    setInsuranceProduct(null);
    setState('');
    setLga(null);
    setHospital(null);
    setBeneficiaries([]);
  };
  return (
    <OnboardingContext.Provider
      value={{
        canRestart,
        setCanRestart,
        restart,

        canGoForward,
        setCanGoForward,

        progress,
        setProgress,

        previousPage,
        setPreviousPage,

        nextPage,
        setNextPage,

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
      <div className={`${nextPage ? 'pb-[5.3125rem]' : ''} pt-[65px]`}>
        <SignupHeader />
        <main className="px-md py-xl max-w-[1200px] mx-auto w-full">
          {children}
        </main>
        <SignupFooter />
      </div>
    </OnboardingContext.Provider>
  );
};