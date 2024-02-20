import {
  Alert,
  Button,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  Icon,
  Paragraph,
  Text,
} from '@/components';
import { Confirm, Modal, ModalProps } from '@/components/display/modal';
import { Statistic } from '@/components/display/statistics';
import { useDisclosure, useForm, useFormValidator } from '@/hooks';
import React, { useEffect } from 'react';

export interface BeneficiaryCard {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  title?: string;
  onDelete?: () => void;
  onUpdate?: (beneficiary: Beneficiary) => void;
}

export const BeneficiaryCard: React.FC<BeneficiaryCard> = ({
  firstName,
  lastName,
  relationship,
  dateOfBirth,
  title,
  onDelete,
  onUpdate,
}) => {
  const updateModal = useDisclosure();
  const deleteModal = useDisclosure();
  const data = [
    ['First name', firstName],
    ['Last name', lastName],
    ['Relationship', relationship],
    ['Date of Birth', dateOfBirth],
  ];

  return (
    <>
      <div className="bg-white border border-[#EAECF0] rounded-2xl">
        <div className="p-lg gap-md grid grid-cols-1 md:grid-cols-2">
          {data.map(([key, value]) => (
            <Statistic
              key={key}
              heading={key}
              value={value}
              className="even:justify-end even:text-right"
            />
          ))}
        </div>
        <div className="bg-[#F8F9FA] border-t border-[#EAECF0] rounded-b-2xl p-lg flex justify-between">
          <div>
            <Button colorScheme="white" size="sm">
              {title}
            </Button>
          </div>
          <div className="flex gap-md">
            <Button
              colorScheme="gray"
              isFlush
              variant="link"
              leftIcon={<Icon name="IconPencil" size={16} />}
              onClick={updateModal.open}
            />
            <Button
              isFlush
              variant="link"
              leftIcon={<Icon name="IconTrash" size={16} />}
              onClick={deleteModal.open}
            />
          </div>
        </div>
      </div>
      <UpdateBeneficiary
        initialValues={{
          firstName,
          lastName,
          relationship,
          dateOfBirth,
        }}
        onClose={updateModal.close}
        isOpen={updateModal.isOpen}
        onSubmit={onUpdate}
      />
      <Confirm
        title="You're about to delete this beneficiary."
        description="Are you sure you want to continue? This action cannot be undone."
        okText="Yes I'm sure"
        onConfirm={onDelete}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
      />
    </>
  );
};

export interface CreateBeneficiaryProps extends ModalProps {
  onSubmit?: (values: Beneficiary) => void;
}

export const CreateBeneficiary: React.FC<CreateBeneficiaryProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [beneficiary, setBeneficiary] = React.useState<Beneficiary | null>(
    null
  );
  const [state, setState] = React.useState<'create' | 'confirm' | null>(null);
  const onAddBeneficiary = (value: Beneficiary) => {
    setBeneficiary(value);
    setState('confirm');
  };
  const onConfirm = () => {
    if (beneficiary) onSubmit?.(beneficiary);
    setState(null);
    setBeneficiary(null);
    onClose?.();
  };
  const onCancel = () => {
    setBeneficiary(null);
    setState(null);
    onClose?.();
  };

  useEffect(() => {
    if (isOpen) setState('create');
  }, [isOpen]);

  return (
    <>
      <BeneficiaryForm
        mode="create"
        isOpen={isOpen && state === 'create'}
        onClose={onCancel}
        onSubmit={onAddBeneficiary}
      />
      <Confirm
        isOpen={isOpen && state === 'confirm'}
        title="You have made some changes"
        description="Are you sure you want to add this user? This action can be edited later."
        okText="Yes, I'm sure"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
};

export interface UpdateBeneficiaryProps extends CreateBeneficiaryProps {
  initialValues: Beneficiary;
}

export const UpdateBeneficiary: React.FC<UpdateBeneficiaryProps> = ({
  initialValues,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [state, setState] = React.useState<'update' | 'confirm' | null>(null);
  const [beneficiary, setBeneficiary] = React.useState<Beneficiary | null>(
    initialValues ?? null
  );
  const onUpdateBeneficiary = (value: Beneficiary) => {
    setBeneficiary(value);
    setState('confirm');
  };
  const onConfirm = () => {
    if (beneficiary) onSubmit?.(beneficiary);
    setState(null);
    setBeneficiary(null);
    onClose?.();
  };
  const onCancel = () => {
    setBeneficiary(null);
    setState(null);
    onClose?.();
  };

  useEffect(() => {
    if (isOpen) setState('update');
  }, [isOpen]);
  return (
    <>
      <BeneficiaryForm
        mode="update"
        initialValues={initialValues}
        isOpen={isOpen && state === 'update'}
        onClose={onCancel}
        onSubmit={onUpdateBeneficiary}
      />
      <Confirm
        isOpen={isOpen && state === 'confirm'}
        title="You have made some changes"
        description="Are you sure you want to update this user? This action can be edited later."
        okText="Yes, I'm sure"
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
};

interface BeneficiaryFormProps extends ModalProps {
  mode: 'create' | 'update';
  initialValues?: Beneficiary;
  onSubmit?: (values: Beneficiary) => void;
}

const BeneficiaryForm: React.FC<BeneficiaryFormProps> = ({
  mode,
  initialValues,
  onSubmit,
  ...props
}) => {
  const {
    values,
    isFormValid,
    errors,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useForm({
    initialValues: {
      firstName: initialValues?.firstName ?? '',
      lastName: initialValues?.lastName ?? '',
      relationship: initialValues?.relationship ?? '',
      dateOfBirth: initialValues?.dateOfBirth ?? '',
    },
    validation: {
      firstName: useFormValidator().required().alphabets.only(),
      lastName: useFormValidator().required().alphabets.only(),
      relationship: useFormValidator().required(),
      dateOfBirth: useFormValidator().required().date.date(),
    },
    validateOnInit: mode === 'update',
    validateOnSubmit: true,
    onSubmit: (values, isAllValid) => {
      if (isAllValid) {
        onSubmit?.(values as Beneficiary);
        if (mode === 'create') resetForm();
      }
    },
  });

  const relationshipOptions = [
    { title: 'Select Relationship', value: '' },
    { title: 'Husband', value: 'husband' },
    { title: 'Father', value: 'Father' },
    { title: 'Mother', value: 'Mother' },
    { title: 'Son', value: 'Son' },
    { title: 'Daughter', value: 'Daughter' },
    { title: 'Brother', value: 'Brother' },
    { title: 'Sister', value: 'Sister' },
    { title: 'Wife', value: 'Wife' },
  ];

  return (
    <Modal
      heading={mode === 'create' ? 'Add beneficiary' : 'Update beneficiary'}
      subHeading="Enter the fields below to update this beneficiary information"
      body={
        <Form className="flex flex-col gap-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-md">
            <FormGroup
              label="First name"
              errors={errors.firstName}
              input={
                <FormInput
                  placeholder="Enter first name"
                  value={values.firstName}
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
              label="Relationship"
              errors={errors.relationship}
              input={
                <FormSelect
                  placeholder="Enter Relationship"
                  strategy="absolute"
                  value={values.relationship}
                  options={relationshipOptions}
                  onChange={(value) =>
                    setFieldValue('relationship', value as string)
                  }
                />
              }
            />
            <FormGroup
              label="Date of birth"
              errors={errors.dateOfBirth}
              input={
                <FormInput
                  placeholder="Enter date of birth (mm/dd/yy)"
                  value={values.dateOfBirth}
                  type="date"
                  onChange={(value) =>
                    setFieldValue('dateOfBirth', value.toString())
                  }
                />
              }
            />
            <Alert
              colorScheme="pink"
              description="This user will now be able to share in your wealth of insurance."
            />
          </div>
          <div className="grid md:grid-cols-2 gap-md">
            <Button colorScheme="gray" size="lg" onClick={props.onClose}>
              Cancel
            </Button>
            <Button isDisabled={!isFormValid} size="lg" type="submit">
              {mode === 'create' ? 'Add' : 'Update'}
            </Button>
          </div>
        </Form>
      }
      {...props}
    />
  );
};
