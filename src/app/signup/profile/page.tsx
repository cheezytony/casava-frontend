'use client';

import {
  Alert,
  Avatar,
  Button,
  Card,
  CustomMiddleware,
  FormGroup,
  FormInput,
  Heading,
  Width,
} from '@/components';
import {
  useDisclosure,
  useForm,
  useFormValidator,
  useOnboarding,
} from '@/hooks';
import { BeneficiaryCard, CreateBeneficiary } from './beneficiary';
import React from 'react';

export default function SignupProfilePage() {
  const previousPage = '/signup/hospital';
  const {
    hospital,

    customer,
    setCustomer,

    beneficiaries,
    addBeneficiary,
    removeBeneficiary,
    updateBeneficiary,

    setNextAction,
    setPreviousPage,
    setProgress,
  } = useOnboarding();
  const middleware = () => !!hospital;

  const modal = useDisclosure();
  const { values, errors, isAllValid, setFieldValue } = useForm({
    initialValues: {
      firstName: customer?.firstName ?? 'Antonio',
      lastName: customer?.lastName ?? 'Okoro',
      email: customer?.email ?? 'cheezytony1@gmail.com',
      phoneNumber: customer?.phoneNumber ?? '08105844849',
      residentialAddress: customer?.residentialAddress ?? '198 Adetola Street',
    },
    validation: {
      firstName: useFormValidator().required(),
      lastName: useFormValidator().required(),
      email: useFormValidator().required().email(),
      phoneNumber: useFormValidator().required()._string.length(11),
      residentialAddress: useFormValidator().required(),
    },
    // validateOnInit: Object.values(customer ?? {}).filter(Boolean).length > 0,
    validateOnInit: true,
  });

  React.useEffect(() => {
    setPreviousPage(previousPage);
    setProgress(20);
    return () => {
      setPreviousPage(null);
      setProgress(0);
    };
  }, [setPreviousPage, setProgress]);

  React.useEffect(() => {
    setNextAction({
      href: '/signup/plan',
      canNavigate: !!isAllValid,
    });
    return () => setNextAction(null);
  }, [isAllValid]);

  React.useEffect(() => {
    setCustomer((customer) => ({ ...customer, ...values }));
  }, [values, setCustomer]);

  return (
    <CustomMiddleware middleware={middleware} redirectTo={previousPage}>
      <div className='flex flex-col gap-lg items-center'>
        <div className="flex flex-col gap-md items-center text-center">
          <Avatar size="xl" />
          <Heading as="h2" level={2}>
            <span className="text-pink-700">Fantastic!</span> Let&apos;s get to
            know <br className="hidden md:block" />
            you
          </Heading>
        </div>

        <Width max={686} xAuto>
          <Alert
            colorScheme="pink"
            title="Personal Details"
            description="Please note all fields are required. Please ensure that all names provided should be their registered government names as we'll craft out the agreement with the details provided."
          />
        </Width>

        <Width max="736px" className="flex flex-col gap-lg">
          <Card size="lg" bodyClassName="gap-lg grid grid-cols-1 md:grid-cols-2">
            <FormGroup
              label="First name"
              errors={errors.firstName}
              input={
                <FormInput
                  placeholder="Enter first name"
                  value={values.firstName}
                  name='first_name'
                  onChange={(value) =>
                    setFieldValue(
                      'firstName',
                      value.toString().replace(/[^a-zA-Z]/g, '')
                    )
                  }
                />
              }
            />
            <FormGroup
              label="Last name"
              errors={errors.lastName}
              input={
                <FormInput
                  placeholder="Enter last name"
                  value={values.lastName}
                  name='last_name'
                  onChange={(value) =>
                    setFieldValue(
                      'lastName',
                      value.toString().replace(/[^a-zA-Z]/g, '')
                    )
                  }
                />
              }
            />
            <FormGroup
              label="Email address"
              errors={errors.email}
              input={
                <FormInput
                  placeholder="Enter email address"
                  value={values.email}
                  name='email'
                  onChange={(value) =>
                    setFieldValue('email', value.toString().replace(/\s/g, ''))
                  }
                />
              }
            />
            <FormGroup
              label="Phone number"
              errors={errors.phoneNumber}
              input={
                <FormInput
                  placeholder="Enter phone number"
                  value={values.phoneNumber}
                  name='phone'
                  onChange={(value) =>
                    setFieldValue(
                      'phoneNumber',
                      value.toString().replace(/[^\d]/g, '')
                    )
                  }
                />
              }
            />
            <FormGroup
              className="md:col-span-2"
              label="Residential address"
              errors={errors.residentialAddress}
              input={
                <FormInput
                  placeholder="Enter residential address"
                  value={values.residentialAddress}
                  name='address'
                  onChange={(value) =>
                    setFieldValue('residentialAddress', value.toString())
                  }
                />
              }
            />
          </Card>
          {beneficiaries.length > 0 && (
            <Card bodyClassName="flex flex-col gap-md">
              {beneficiaries.map((beneficiary, index) => (
                <BeneficiaryCard
                  key={index}
                  title={`Beneficiary ${index + 1}`}
                  onDelete={() => removeBeneficiary(index)}
                  onUpdate={(beneficiary) =>
                    updateBeneficiary(index, beneficiary)
                  }
                  {...beneficiary}
                />
              ))}
            </Card>
          )}
          <div className="div">
            <Button isFlush leftIcon="IconPlus" variant="link" onClick={modal.onOpen}>
              Add beneficiary
            </Button>
          </div>
        </Width>
      </div>
      <CreateBeneficiary
        {...modal}
        onSubmit={addBeneficiary}
      />
    </CustomMiddleware>
  );
}
