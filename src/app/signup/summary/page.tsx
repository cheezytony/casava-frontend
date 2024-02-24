'use client';

import {
  Alert,
  Avatar,
  Button,
  Card,
  CustomMiddleware,
  Heading,
  Icon,
  Paragraph,
  Statistic,
  Tag,
  Text,
} from '@/components';
import { useOnboarding, usePayment } from '@/hooks';
import { numberFormat } from '@/utils';
import React from 'react';
import { Hospital } from '../hospital/hospital';

export default function SignupSummaryPage() {
  const previousPage = '/signup/plan';
  const {
    plan,
    planFrequency,

    customer,

    setPreviousPage,
    setProgress,
  } = useOnboarding();
  const middleware = () => (!!plan && !!planFrequency);
  
  const pay = usePayment({
    amount: 3439.0,
    email: customer?.email!,
    reference: '',
    metadata: {},
    onClose: (response) => {
      console.log('onClose', response);
    },
    onSuccess: (response) => {
      console.log('onSuccess', response.reference);
    },
  });

  const benefits = [
    'Prescribed Medicines and drugs',
    'Basic X-Rays, laboratory & diagnostic tests',
    'Outpatient care and general consultation',
    'NPI immunisations',
    'Accidents and emergencies',
    <span key="gynaecology">
      Gynaecological consultation <strong>(1 session per year)</strong>
    </span>,
    <span key="minor-surgery">
      Minor surgery and procedures <strong>(₦ 50,000)</strong>
    </span>,
    <span key="antenatal">
      Antenatal care <strong>(₦ 10,000)</strong>
    </span>,
  ];

  React.useEffect(() => {
    setPreviousPage(previousPage);
    setProgress(40);
    return () => {
      setPreviousPage(null);
      setProgress(0);
    };
  }, [setPreviousPage, setProgress]);

  return (
    <CustomMiddleware middleware={middleware} redirectTo={previousPage}>
      <div className="flex flex-col gap-md items-center text-center mb-[40px]">
        <Avatar size="xl" />
        <Heading as="h2" level={2}>
          Here&apos;s a summary of <br className="hidden md:block" />
          your plan
        </Heading>
      </div>
      <div className="flex flex-col gap-[32px] lg:flex-row">
        <Card className="lg:grow" size="lg">
          <div className="flex gap-[14px] items-center mb-lg">
            <Avatar
              className="bg-pink-100"
              name="Onuchukwu Michael"
              size={40}
            />
            <Paragraph className="font-semibold">Onuchukwu Michael</Paragraph>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <div className="mb-10">
                <Paragraph size="xl" className="font-semibold mb-1">
                  Your health plan has been calculated
                </Paragraph>
                <Paragraph className="text-[#667085]">
                  Please note that the summary below was based on the
                  information provided
                </Paragraph>
              </div>

              <Card
                colorScheme="pink"
                bodyClassName="grid grid-cols-1 sm:grid-cols-2 gap-lg"
                size="lg"
              >
                <Statistic heading="Users included this plan" value="3 Users" />
                <div className="md:text-right">
                  <Button href="/signup/profile" isFlush variant="link">
                    Change
                  </Button>
                </div>
                <Statistic heading="Premium" value="Dec 3, 2023" />
                <Statistic
                  heading="Next Payment Date"
                  value="Dec 3, 2023"
                  className="md:justify-end md:text-right"
                />
                <Alert
                  colorScheme="pink"
                  description="Please note that you will pay this amount every month."
                  className="sm:col-span-2"
                />
              </Card>
            </div>
            <div>
              <Paragraph size="xl" className="font-semibold mb-4">
                Your plan
              </Paragraph>

              <Card colorScheme="pink" size="lg">
                <div className="flex gap-lg mb-lg">
                  <div className="bg-pink-100 text-pink-700 rounded-lg grid place-items-center h-8 w-8">
                    <Icon name="IconBox" />
                  </div>
                  <div className="div">
                    <Tag variant="ghost">Seed Plan</Tag>
                    <div className="flex gap-1 items-baseline">
                      <Paragraph
                        size="xl"
                        className="font-semibold text-[#344054]"
                      >
                        {numberFormat(1350, 'currency')}
                      </Paragraph>
                      <Paragraph size="xs" className="text-[#667085]">
                        per month
                      </Paragraph>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Button href="/signup/plan" isFlush variant="link">
                      Change
                    </Button>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Heading as="h3" level={3}>
                    ₦120,000
                  </Heading>
                </div>
                <hr className="border-pink-700 my-lg -mx-lg" />
                <div className="flex flex-col gap-md">
                  <Text className="font-semibold text-[#101828] uppercase">
                    COVERAGE BENEFITS
                  </Text>
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Icon
                        name="IconCheckmarkCircle"
                        className="text-pink-700"
                      />
                      <Paragraph size="sm">{benefit}</Paragraph>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div>
              <Paragraph size="xl" className="font-semibold mb-4">
                Your primary hospital
              </Paragraph>

              <Hospital
                slug="marien"
                isSelected
                cta={
                  <Button href="/signup/hospital" isFlush variant="link">
                    Change
                  </Button>
                }
              />
            </div>
          </div>
        </Card>
        <Card
          className="w-full lg:w-[400px] xl:w-[500px] shrink-0 self-start sticky top-[81px]"
          bodyClassName="flex flex-col gap-lg"
          size="lg"
        >
          <Heading level={7}>
            <span className="font-sans font-bold">Payment Summary</span>
          </Heading>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <Paragraph className="text-">Subtotal</Paragraph>
              <Paragraph className="font-semibold">
                {numberFormat(3720.27, 'currency')}
              </Paragraph>
            </div>
            <div className="flex justify-between gap-4">
              <Paragraph className="text-">Discount</Paragraph>
              <Paragraph className="font-semibold">
                {numberFormat(-749.99, 'currency')}
              </Paragraph>
            </div>
            <div className="flex justify-between gap-4">
              <Heading level={7} className="text-">
                <span className="font-sans">Total</span>
              </Heading>
              <Heading level={7}>
                <span className="font-sans font-bold">
                  {numberFormat(3439.0, 'currency')}
                </span>
              </Heading>
            </div>
          </div>
          <Button onClick={pay}>Subscribe Now</Button>
        </Card>
      </div>
    </CustomMiddleware>
  );
}
