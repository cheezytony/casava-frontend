import {
  Alert,
  Button,
  Card,
  Form,
  FormDate,
  FormGroup,
  FormInput,
  FormSelect,
  Icon,
  Modal,
  ModalProps,
  Statistic,
} from '@/components';
import { useAlert } from '@/contexts/AlertContext';
import { useDisclosure, useForm, useFormValidator } from '@/hooks';
import React from 'react';

export interface BeneficiaryCard {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: Date;
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
  const { confirm } = useAlert();
  const deleteBeneficiary = () => {
    confirm({
      title: "You're about to delete this beneficiary.",
      description:
        'Are you sure you want to continue? This action cannot be undone.',
      okText: "Yes, I'm sure",
      onOk: onDelete,
    });
  };

  const updateModal = useDisclosure();
  const data: Array<[string, string | Date | null]> = [
    ['First name', firstName],
    ['Last name', lastName],
    ['Relationship', relationship],
    ['Date of Birth', dateOfBirth],
  ];

  return (
    <>
      <Card
        size="lg"
        footer={
          <div className="flex justify-between">
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
                onClick={updateModal.onOpen}
              />
              <Button
                isFlush
                variant="link"
                leftIcon={<Icon name="IconTrash" size={16} />}
                onClick={deleteBeneficiary}
              />
            </div>
          </div>
        }
      >
        <div className="gap-md grid grid-cols-1 md:grid-cols-2">
          {data.map(([label, value]) => (
            <Statistic
              key={label}
              heading={label}
              value={value}
              className="md:even:justify-end md:even:text-right"
            />
          ))}
        </div>
      </Card>
      <UpdateBeneficiary
        initialValues={{
          firstName,
          lastName,
          relationship,
          dateOfBirth,
        }}
        onClose={updateModal.onClose}
        isOpen={updateModal.isOpen}
        onSubmit={onUpdate}
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
  const { confirm } = useAlert();
  const onAddBeneficiary = (value: Beneficiary) => {
    onClose?.();
    confirm({
      title: 'You have made some changes',
      description:
        'Are you sure you want to add this user? This action can be edited later.',
      onOk: () => {
        onSubmit?.(value);
      },
    });
  };
  return (
    <>
      <BeneficiaryForm
        mode="create"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onAddBeneficiary}
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
  const { confirm } = useAlert();
  const onUpdateBeneficiary = (value: Beneficiary) => {
    onClose?.();
    confirm({
      title: 'You have made some changes',
      description:
        'Are you sure you want to update this user? This action can be edited later.',
      onOk: () => {
        onSubmit?.(value);
      },
    });
  };
  return (
    <>
      <BeneficiaryForm
        mode="update"
        initialValues={initialValues}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onUpdateBeneficiary}
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
  const { values, isAllValid, errors, setFieldValue, handleSubmit, resetForm } =
    useForm<{
      firstName: string;
      lastName: string;
      relationship: string;
      dateOfBirth: Date | null;
    }>({
      initialValues: {
        firstName: initialValues?.firstName ?? '',
        lastName: initialValues?.lastName ?? '',
        relationship: initialValues?.relationship ?? '',
        dateOfBirth: initialValues?.dateOfBirth ?? null,
      },
      validation: {
        firstName: useFormValidator().required()._alphabets.only(),
        lastName: useFormValidator().required()._alphabets.only(),
        relationship: useFormValidator().required(),
        dateOfBirth: useFormValidator().required().date(),
      },
      validateOnInit: mode === 'update',
      onSubmit: (values, isAllValid) => {
        if (isAllValid) {
          onSubmit?.(values as Beneficiary);
          if (mode === 'create') resetForm();
        }
      },
    });

  const relationshipOptions = [
    { label: 'Select Relationship', value: '' },
    { label: 'Husband', value: 'husband' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Wife', value: 'Wife' },
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
                <FormDate
                  placeholder="Enter date of birth (mm/dd/yy)"
                  value={values.dateOfBirth}
                  onChange={(value) =>
                    setFieldValue('dateOfBirth', value as Date)
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
            <Button
              colorScheme="gray"
              size="lg"
              className="order-2 md:order-1"
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              className="order-1 md:order-2"
              isDisabled={!isAllValid}
              size="lg"
              type="submit"
            >
              {mode === 'create' ? 'Add' : 'Update'}
            </Button>
          </div>
        </Form>
      }
      {...props}
    />
  );
};
