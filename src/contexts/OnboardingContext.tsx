import React, { PropsWithChildren } from 'react';
import { InsuranceProduct } from '../../types';

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
}

export const OnboardingContext =
  React.createContext<OnboardingContextAttributes>({} as OnboardingContextAttributes);

export const OnboardingContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
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
  const [customer, setCustomer] = React.useState<Customer | null>(null)

  const [beneficiaries, setBeneficiaries] = React.useState<Beneficiary[]>([]);

  const addBeneficiary = (beneficiary: Beneficiary) => {
    setBeneficiaries((prev) => [...prev, beneficiary]);
  };
  const removeBeneficiary = (index: number) => {
    setBeneficiaries((prev) => prev.filter((_, i) => i !== index));
  }
  const updateBeneficiary = (index: number, beneficiary: Beneficiary) => {
    setBeneficiaries((prev) => prev.map((b, i) => (i === index ? beneficiary : b)));
  }

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
  }

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
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};