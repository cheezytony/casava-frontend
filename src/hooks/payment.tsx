import { usePaystackPayment } from 'react-paystack';

interface SuccessResponse {
  message: string;
  redirecturl: string;
  reference: string;
  status: 'success';
  trans: number | string;
  transaction: number | string;
  trxref: string;
}

export interface PaymentProps {
  email: string;
  amount: number;
  reference: string;
  metadata: any;
  onSuccess?: (response: SuccessResponse) => void;
  onClose?: (response: any) => void;
} 

export const usePayment = ({ onClose, onSuccess, ...config}: PaymentProps) => {
  const initializePayment = usePaystackPayment({
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    ...config,
  });

  return () => initializePayment({ onClose, onSuccess});
};
