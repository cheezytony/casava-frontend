'use client';

import { Button, Heading, Icon, Paragraph, Width } from '@/components';
import { useOnboarding } from '@/hooks';
import Image from 'next/image';
import React from 'react';

export default function SignupKycPage() {
  const { isFlush, setIsFlush } = useOnboarding();

  React.useEffect(() => {
    setIsFlush(true);
    return () => setIsFlush(false);
  }, [setIsFlush]);

  if (!isFlush) return null;

  return (
    <div className="flex flex-col max-w-[1680px] mx-auto w-full md:flex-row md:min-h-[calc(100dvh-65px)]">
      <Width className="bg-pink-700 grow md:order-2" max={596}>
        <Image
          src="/images/signup/activate-policy.png"
          alt=""
          width={596}
          height={853}
          loading="lazy"
          className="w-full h-full object-cover"
          priority={false}
        />
      </Width>
      <div className="grow py-[64px] px-4 md:order-1">
        <Width
          max={546}
          xAuto
          className="flex flex-col justify-between gap-lg h-full"
        >
          <div className="flex flex-col gap-lg items-start">
            <Heading as="h2" level={2}>
              Activate your Policy
            </Heading>
            <Paragraph className="text-[#555555]" size="lg">
              Complete KYC on your account to activate your health insurance
              policy. Your progress will be saved, so you can finish up later.
            </Paragraph>
            <Button
              href='/signup/kyc/identity'
              isRounded
              rightIcon={<Icon name="IconArrowRight" size={20} />}
              size="lg"
            >
              Complete KYC
            </Button>
          </div>
          <div>
            <hr className="border-t border-[#E6E6E6] mb-4" />
            <div className="gap-lg grid grid-cols-1 sm:grid-cols-2">
              <div>
                <div className="bg-pink-100 inline-grid place-items-center w-[24px] h-[24px] rounded-full mb-[5px]">
                  <Icon name="IconClock" size={16} />
                </div>
                <Paragraph className="font-semibold text-[#374151] mb-3">
                  How long does it take?
                </Paragraph>
                <Paragraph className="text-[#4B5563]">
                  This takes less than a minute to complete the KYC verification
                  process.
                </Paragraph>
              </div>
              <div>
                <div className="bg-pink-100 inline-grid place-items-center w-[24px] h-[24px] rounded-full mb-[5px]">
                  <Icon name="IconAlertCircle" size={16} />
                </div>
                <Paragraph className="font-semibold text-[#374151] mb-3">
                  Why is this important?
                </Paragraph>
                <Paragraph className="text-[#4B5563]">
                  It is a government requirement to verify the authenticity of
                  the customer&apos;s identity & information.
                </Paragraph>
              </div>
            </div>
          </div>
        </Width>
      </div>
    </div>
  );
}
