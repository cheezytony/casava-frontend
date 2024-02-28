'use client';

import {
  Button,
  Form,
  FormGroup,
  FormInput,
  FormPassword,
  Heading,
  Icon,
  Paragraph,
  Width,
} from '@/components';
import { useForm, useFormValidator, useOnboarding } from '@/hooks';
import React from 'react';

export default function SignupKycIdentityPage() {
  const { nextAction } = useOnboarding();
  const { values, errors, isAllValid, valid, setFieldValue, handleSubmit } =
    useForm({
      initialValues: {
        password: '',
        passwordConfirmation: '',
      },
      validation: {
        password: useFormValidator()
          .required()
          ._string.min(8)
          .numbers()
          ._alphabets.uppercase()
          .specialCharacters(),
        passwordConfirmation: useFormValidator()._form.exact('password'),
      },
      validateAllRulesAtOnce: true,
      onSubmit: (values) => {
        console.log('Do something...');
      }
    });

  const hasPasswordErrors = React.useMemo(() => {
    return Object.keys(errors.password ?? {}).length > 0;
  }, [errors]);

  const hasPasswordConfirmationErrors = React.useMemo(() => {
    return Object.keys(errors.passwordConfirmation ?? {}).length > 0;
  }, [errors]);

  return (
    <Width max={704} xAuto>
      <Heading as="h3" level={3} className="mb-lg">
        Create your password
      </Heading>
      <Paragraph size="sm" className="mb-md">
        Fill in the fields below to create your password
      </Paragraph>

      <Form className="flex flex-col gap-lg" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-md">
          <FormGroup
            label="New password"
            input={
              <FormPassword
                placeholder="Enter your password"
                value={values.password}
                onChange={(value) => setFieldValue('password', value as string)}
              />
            }
          />
          <FormGroup
            label="Confirm new password"
            input={
              <FormPassword
                placeholder="Enter your password"
                value={values.passwordConfirmation}
                onChange={(value) =>
                  setFieldValue('passwordConfirmation', value as string)
                }
              />
            }
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <ValidationCheck
            isValid={
              valid.password ||
              (hasPasswordErrors && !errors?.password?.stringMin)
            }
            message="Minimum 8 characters"
          />
          <ValidationCheck
            isValid={
              valid.password ||
              (hasPasswordErrors && !errors?.password?.numbers)
            }
            message="At least 1 Number"
          />
          <ValidationCheck
            isValid={
              valid.password ||
              (hasPasswordErrors && !errors?.password?.alphabetsUppercase)
            }
            message="At least 1 Uppercase"
          />
          <ValidationCheck
            isValid={
              valid.password ||
              (hasPasswordErrors && !errors?.password?.specialCharacters)
            }
            message="Minimum 1 special character"
          />
          <ValidationCheck
            isValid={
              valid.passwordConfirmation ||
              (hasPasswordConfirmationErrors &&
                !errors?.passwordConfirmation?.exact)
            }
            message="Passwords must match"
          />
        </div>
        <Button isDisabled={!isAllValid} size="lg" type="submit">
          Set Password
        </Button>
      </Form>
    </Width>
  );
}

interface ValidationChecklistProps {
  isValid: boolean;
  message: string;
}

const ValidationCheck: React.FC<ValidationChecklistProps> = ({
  isValid,
  message,
}) => {
  return (
    <div className="flex gap-sm">
      <Icon
        name={isValid ? 'IconCheckmarkCircle' : 'IconCircle'}
        className={isValid ? 'text-pink-700' : 'text-[#808080]'}
        size={24}
      />
      <Paragraph
        size="sm"
        className={isValid ? 'text-[#000000]' : 'text-[#808080]'}
      >
        {message}
      </Paragraph>
    </div>
  );
};
