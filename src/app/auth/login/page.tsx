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

export default function LoginPage(): JSX.Element {
  const { confirm } = useAlert();
  const { values, errors, setFieldValue, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validation: {
      email: useFormValidator().required(),
      password: useFormValidator().required(),
    },
    onSubmit: (values, isValid) => {
      if (!isValid) return;
      confirm({
        icon: <Icon name="IconPerson" className="text-black" size={32} />,
        title: (
          <div>
            Glad you&apos;re back, <span className='text-pink-700'>Felix</span>
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
        Welcome back! 👋🏾
      </Heading>
      <Paragraph className="mb-6 text-[#6B7280]">
        Experience accessible and flexible insurance policies by signing into
        your account.
      </Paragraph>

      <Form onSubmit={handleSubmit}>
        <FormGroup
          errors={errors.email}
          className="mb-4"
          label="Email address"
          input={
            <FormInput
              name="email"
              placeholder="Enter your email address"
              value={values.email}
              onChange={(value) => setFieldValue('email', value.toString())}
            />
          }
        />
        <FormGroup
          errors={errors.password}
          className="mb-[4px]"
          label="Password"
          input={
            <FormPassword
              autoComplete="current-password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(value) => setFieldValue('password', value.toString())}
            />
          }
        />
        <div className="mb-6">
          <Link
            href="/auth/forgot-password"
            className="text-pink-700 font-semibold text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" size="lg" className="block w-full mb-6">
          Login
        </Button>
        <div className="text-center text-sm text-[#667185]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-pink-700 font-semibold">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
}
