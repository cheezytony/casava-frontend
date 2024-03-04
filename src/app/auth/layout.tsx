'use client';

import { Avatar, Heading, Logo, Paragraph, Width } from '@/components';

const AuthenticationLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="grid place-items-center md:min-h-[100dvh]">
      <Width max={1440} xAuto yAuto className="flex flex-col p-md md:flex-row md:h-[100dvh] md:max-h-[1024px]">
        <Width max={700}>
          <div className="bg-pink-700 text-white h-full rounded-[30px] p-md md:p-[60px]">
            <div className="flex items-center gap-sm mb-10 md:mb-[95px]">
              <Logo color="white" height={22} />
              <div className="border-l-2 border-white h-[29px] w-px" />
              <Heading as="p" level={4}>
                Bloom
              </Heading>
            </div>

            <Heading as="p" level="lg" className="mb-8">
              Experience smooth, easy insurance with Casava
            </Heading>

            <Paragraph size="lg" className="mb-[105px]">
              Casava Bloom offers a variety of insurance products for businesses
              and employees, including health insurance, life insurance, and
              property insurance.
            </Paragraph>

            <div className="bg-pink-900 rounded-[20px] p-lg flex flex-col gap-md">
              <Paragraph>
                I got initiated into the Casava clan through their income
                protection product. I like that they offer more than just the
                regular health insurance options. Casava has very affordable rates
                with top-notch customer experience. Simplest onboarding experience
                I have ever experienced.
              </Paragraph>

              <div className="flex items-center gap-[12px]">
                <Avatar size={40} />
                <div className="flex flex-col">
                  <Paragraph className='font-semibold'>Ariana Grande</Paragraph>
                  <Paragraph size='sm'>Visual Designer, Google</Paragraph>
                </div>
              </div>
            </div>
          </div>
        </Width>
        <div className="flex-grow grid place-items-center">
          <Width max={454} xAuto>
            {children}
          </Width>
        </div>
      </Width>
    </div>
  );
};

export default AuthenticationLayout;
