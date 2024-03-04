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
} from '@/components';
import { useAlert } from '@/contexts/AlertContext';
import { useForm, useFormValidator } from '@/hooks';
import Link from 'next/link';

export default function ForgotPasswordPage(): JSX.Element {
  const { confirm } = useAlert();
  const { values, errors, setFieldValue, handleSubmit } = useForm({
    initialValues: { email: '' },
    validation: {
      email: useFormValidator().required(),
    },
    onSubmit: (values, isValid) => {
      if (!isValid) return;
      confirm({
        icon: <Icon name="IconPerson" className="text-black" size={32} />,
        title: (
          <div>
            Glad you&apos;re back, <span className="text-pink-700">Felix</span>
          </div>
        ),
        description:
          "You're almost done. Let's pick up right where you left off.",
        showCancelButton: true,
        okText: 'Continue',
      });
    },
  });
  return (
    <div>
      <Heading as="h1" level={1} className="mb-[4px]">
        Forgot your password?
      </Heading>
      <Paragraph className="mb-4 text-[#6B7280]">
        Enter your email address and we will send you instructions to reset your
        password.
      </Paragraph>

      <Form onSubmit={handleSubmit}>
        <FormGroup
          errors={errors.email}
          className="mb-6"
          label="Email address"
          input={
            <FormInput
              placeholder="Enter your email address"
              name='email'
              value={values.email}
              onChange={(value) => setFieldValue('email', value.toString())}
            />
          }
        />
        <Button type="submit" size="lg" className="block w-full mb-4">
          Get reset instructions
        </Button>
        <Button
          colorScheme="gray"
          size="lg"
          variant="outline"
          type="submit"
          className="block w-full"
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
}
