import React from 'react';
import { InsuranceProduct, PlanFrequency } from '../../types';

export interface OnboardingContextAttributes {
  canRestart: boolean;
  setCanRestart: React.Dispatch<React.SetStateAction<boolean>>;
  restart: () => void;

  canGoForward: boolean;
  setCanGoForward: React.Dispatch<React.SetStateAction<boolean>>;

  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;

  nextPage: string | null;
  setNextPage: React.Dispatch<React.SetStateAction<string | null>>;

  previousPage: string | null;
  setPreviousPage: React.Dispatch<React.SetStateAction<string | null>>;

  insuranceProduct: InsuranceProduct | null;
  setInsuranceProduct: React.Dispatch<
    React.SetStateAction<InsuranceProduct | null>
  >;

  state: any;
  setState: React.Dispatch<React.SetStateAction<any>>;

  lga: any;
  setLga: React.Dispatch<React.SetStateAction<any>>;

  hospital: any;
  setHospital: React.Dispatch<React.SetStateAction<any>>;

  customer: Customer | null;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;

  beneficiaries: Beneficiary[];
  addBeneficiary: (beneficiary: Beneficiary) => void;
  removeBeneficiary: (index: number) => void;
  updateBeneficiary: (index: number, beneficiary: Beneficiary) => void;

  plan: Plan | null;
  setPlan: React.Dispatch<React.SetStateAction<Plan | null>>;

  planFrequency: PlanFrequency;
  setPlanFrequency: React.Dispatch<
    React.SetStateAction<PlanFrequency>
  >;
}

export const OnboardingContext =
  React.createContext<OnboardingContextAttributes>({} as OnboardingContextAttributes);
