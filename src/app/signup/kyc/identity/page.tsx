'use client';

import {
  Alert,
  Avatar,
  Button,
  Form,
  FormDate,
  FormGroup,
  FormInput,
  FormSelect,
  Heading,
  Icon,
  Modal,
  Paragraph,
  Width,
} from '@/components';
import { useAlert } from '@/contexts/AlertContext';
import {
  useDisclosure,
  useForm,
  useFormValidator,
  useOnboarding,
} from '@/hooks';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function SignupKycIdentityPage() {
  const { setNextAction } = useOnboarding();
  const { success, error } = useAlert();
  const router = useRouter();
  const dobError = useDisclosure();
  const nameError = useDisclosure();
  const maxDateOfBirth = React.useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  }, []);

  const { values, errors, isAllValid, setFieldValue, handleSubmit } = useForm<{
    dateOfBirth: Date | null;
    idType: string;
    idNumber: string;
  }>({
    initialValues: {
      dateOfBirth: null,
      idType: '',
      idNumber: '',
    },
    validation: {
      dateOfBirth: useFormValidator().required(),
      idType: useFormValidator().required(),
      idNumber: useFormValidator().required(),
    },
    onSubmit: async (value, isValid) => {
      if (!isValid) return;

      const retry = await error({
        title: 'Verification unsuccessful',
        description:
          'Unable to validate your BVN. Kindly re-input your correct details or try another ID type.',
        okText: 'Try Again',
        showCancelButton: true,
        onOk: () => {
          console.log('Do Something...');
        },
      });
      if (!retry) return;

      await dobError.onOpen();

      await nameError.onOpen();

      await success({
        title: 'Verification successful',
        description: 'Congratulations! Your policy is now activated!',
        okText: 'Done',
      });

      router.push('/signup/kyc/password');
    },
  });

  const idTypes = [
    {
      value: '25',
      title: 'Bank Verification Number (BVN)',
      valueLabel: 'Bank Verification Number',
    },
    { value: '21', title: "Voter's Card", valueLabel: "Voter's Card Number" },
    {
      value: '22',
      title: "Driver's License",
      valueLabel: "Driver's License Number",
    },
  ];
  const idOptions = React.useMemo(() => {
    return idTypes.map((type) => ({ label: type.title, value: type.value }));
  }, []);
  const idNumberLabel = React.useMemo(() => {
    const idType = idTypes.find((type) => type.value === values.idType);
    return idType?.valueLabel;
  }, [values]);

  React.useEffect(() => {
    setNextAction({ action: handleSubmit, canNavigate: isAllValid });
    return () => setNextAction(null);
  }, [values, isAllValid]);

  return (
    <Width max={437} xAuto className="flex flex-col gap-lg">
      <div className="flex flex-col gap-md items-center text-center">
        <Avatar size="xl" />
        <Heading as="h2" level={2}>
          Hi Tola, Let&apos;s get
          <br className="hidden md:block" /> you verified
        </Heading>
        <Paragraph className="text-[#555555]">
          We only need to verify your identity to activate your policy.
        </Paragraph>
      </div>

      <div>
        <div className="flex flex-col gap-md">
          <FormGroup
            label="Date of Birth"
            errors={errors.dateOfBirth}
            input={
              <FormDate
                max={maxDateOfBirth}
                value={values.dateOfBirth}
                onChange={(value) =>
                  setFieldValue('dateOfBirth', value as Date)
                }
              />
            }
          />
          <FormGroup
            label="ID Type"
            errors={errors.idType}
            input={
              <FormSelect
                value={values.idType}
                onChange={(value) => setFieldValue('idType', value as string)}
                options={idOptions}
              />
            }
          />
          {values.idType && (
            <FormGroup
              label={idNumberLabel}
              errors={errors.idNumber}
              input={
                <FormInput
                  value={values.idNumber}
                  placeholder={`Enter ${idNumberLabel}`}
                  onChange={(value) =>
                    setFieldValue(
                      'idNumber',
                      value.toString().replace(/\D/g, '')
                    )
                  }
                />
              }
            />
          )}
        </div>
      </div>

      {values.idType && (
        <Alert
          description="We'll validate this information so please double check to ensure it's
        correct."
        />
      )}

      <Modal
        {...dobError}
        body={
          <Form onSubmit={dobError.onClose}>
            <div className="flex flex-col gap-md mb-lg">
              <div className="flex flex-col gap-md items-center text-center">
                <div className="bg-pink-100 text-pink-700 w-[64px] h-[64px] rounded-full grid place-items-center">
                  <Icon name="IconAlertTriangle" size={32} />
                </div>
                <Paragraph size="xl" className="font-semibold">
                  Error in Date of Birth (DOB)
                </Paragraph>
                <Paragraph>
                  The DOB registered to this BVN does not match what you
                  provided. If this is you, kindly edit your DOB to match.
                </Paragraph>
              </div>
              <FormGroup
                label="Date of Birth"
                input={
                  <FormInput
                    type="date"
                    placeholder="Enter date of birth (mm/dd/yy)"
                  />
                }
              />
            </div>
            <Button className="w-full" size="lg" type="submit">
              Verify NIN
            </Button>
          </Form>
        }
      />
      <Modal
        {...nameError}
        body={
          <Form onSubmit={nameError.onClose}>
            <div className="flex flex-col gap-md mb-lg">
              <div className="flex flex-col gap-md items-center text-center">
                <div className="bg-pink-100 text-pink-700 w-[64px] h-[64px] rounded-full grid place-items-center">
                  <Icon name="IconAlertTriangle" size={32} />
                </div>
                <Paragraph size="xl" className="font-semibold">
                  Error in profile name
                </Paragraph>
                <Paragraph>
                  The name registered to this ID is O*******i A*****i, if this
                  is you, kindly edit your profile name to match.
                </Paragraph>
              </div>
              <FormGroup
                label="First name"
                input={<FormInput placeholder="Enter First name" />}
              />
              <FormGroup
                label="Last name"
                input={<FormInput placeholder="Enter Last name" />}
              />
            </div>
            <Button className="w-full" size="lg" type="submit">
              Verify Profile Name
            </Button>
          </Form>
        }
      />
    </Width>
  );
}
