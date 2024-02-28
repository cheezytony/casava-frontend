'use client';

import React from 'react';
import { AlertModal, AlertModalProps } from '@/components';
import { v4 } from 'uuid';

export type CreateAlertProps = Pick<
  AlertModalProps,
  | 'type'
  | 'title'
  | 'description'
  | 'okText'
  | 'duration'
  | 'onOk'
  | 'onClose'
  | 'closeOnEscape'
  | 'closeOnOutsideClick'
  | 'showCancelButton'
  | 'cancelText'
  | 'onCancel'
>;

export interface AlertContext {
  alerts: AlertModalProps[];
  addAlert: (alert: AlertModalProps) => void;
  removeAlert: (alert: AlertModalProps) => void;
}

export const AlertContext = React.createContext<AlertContext>(
  {} as AlertContext
);

export const useAlert = () => {
  const { addAlert } = React.useContext(AlertContext);

  const create = ({ onOk, onCancel, onClose, ...props }: CreateAlertProps) => {
    return new Promise((resolve) => {
      addAlert({
        ...props,
        uuid: v4(),
        onOk: () => {
          resolve(true);
          onOk?.();
        },
        onClose: () => {
          resolve(false);
          onClose?.();
        },
        onCancel: () => {
          resolve(false);
          onCancel?.();
        }
      });
    });
  };

  const success = (props: Omit<CreateAlertProps, 'type'>) =>
    create({ ...props, type: 'success' });
  const error = (props: Omit<CreateAlertProps, 'type'>) =>
    create({ ...props, type: 'error' });
  const warning = (props: Omit<CreateAlertProps, 'type'>) =>
    create({ ...props, type: 'warning' });
  const info = (props: Omit<CreateAlertProps, 'type'>) =>
    create({ ...props, type: 'info' });
  const confirm = ({ type = 'warning', ...props}: CreateAlertProps) =>
    create({ ...props, type, showCancelButton: true  });

  return { create, success, error, warning, info, confirm };
};

export const AlertContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [alerts, setAlerts] = React.useState<AlertModalProps[]>([]);
  const addAlert = (alert: AlertModalProps) => {
    setAlerts((prev) => [...prev, { ...alert, isOpen: true }]);
  };
  const removeAlert = (alert: AlertModalProps) => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isOpen: false })));
    setTimeout(() => {
      setAlerts((prev) => prev.filter(({ uuid }) => alert.uuid !== uuid));
    }, 2000);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      <>
        {children}
        {alerts.map((alert) => (
          <AlertModal
            key={alert.uuid}
            {...alert}
            isOpen={alert.isOpen}
            onOk={() => {
              alert.onOk?.();
              removeAlert(alert);
            }}
            onCancel={() => {
              alert.onCancel?.();
              removeAlert(alert);
            }}
            onClose={() => {
              alert.onClose?.();
              removeAlert(alert);
            }}
          />
        ))}
      </>
    </AlertContext.Provider>
  );
};
