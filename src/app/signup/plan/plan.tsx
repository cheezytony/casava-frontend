import {
  Button,
  Card,
  Dropdown,
  Heading,
  Icon,
  Paragraph,
  Width,
} from '@/components';
import { numberFormat } from '@/utils';
import Link from 'next/link';

export interface PlanProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: number;
  frequency: string;
  isSelected: boolean;
  onShowCoverage?: () => void;
  onClick: () => void;
}

export const Plan: React.FC<PlanProps> = ({
  name,
  price,
  frequency,
  isSelected,
  onShowCoverage,
  onClick,
  ...props
}) => {
  return (
    <Card
      {...props}
      colorScheme={isSelected ? 'pink' : 'gray'}
      footer={
        <div className="flex justify-between">
          <Button
            colorScheme={isSelected ? 'primary' : 'black'}
            isFlush
            size="xs"
            variant="link"
            onClick={onShowCoverage}
          >
            See coverage
          </Button>
          <Button
            colorScheme={isSelected ? 'primary' : 'white'}
            onClick={onClick}
          >
            Select plan
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-xs">
        <Paragraph className="font-semibold text-[#1D2939]">{name}</Paragraph>
        <div className="flex gap-1 items-baseline">
          <Paragraph className="font-semibold" size="xl">
            {numberFormat(price, 'currency')}
          </Paragraph>
          <Paragraph className="capitalize text-[#667085]" size="sm">
            / {frequency} payment
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

export const PlanCoverage: React.FC = () => {
  return (
    <Width>
      <div className="mb-12">
        <Heading as="h3" level={1} className="mb-5">
          What this Plan Covers
        </Heading>
        <Paragraph size="xl">
          Everything you need to know about the coverage of the plan you are
          choosing. Can&apos;t find the answer you&apos;re looking for? Please
          chat to our friendly team.
        </Paragraph>
      </div>

      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-[100px]">
        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconHeartFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            Prescribed drugs
          </Paragraph>
          <Paragraph>
            If you ever fall sick and need any medicinal attention as long as
            they are not considered{' '}
            <span className="font-bold text-pink-700">high-risk</span> and you
            have no reactions to drugs, then we got you covered.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconRefreshFlush" size={24} />
          </div>
          <Paragraph className="font-bold mb-2" size="xl">
            Diagnostic tests
          </Paragraph>
          <Paragraph>
            If you ever any form of diagnosis like basic X-Rays, laboratory and
            diagnostic tests then this plan covers for such diagnosis.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconSlashFlush" size={24} />
          </div>
          <Paragraph className="font-bold mb-2" size="xl">
            Medical consultation
          </Paragraph>
          <Paragraph>
            This plan also made provisions for outpatient care and general
            consultation.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconPlusCircleFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            NPI immunisations
          </Paragraph>
          <Paragraph>
            NPIs are used to identify healthcare professionals and organizations
            in various healthcare transactions, including billing and insurance
            claims.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconCreditCardFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            Accidents and emergencies
          </Paragraph>
          <Paragraph>
            If you experience a medical emergency, you can go to the nearest ER,
            and this health plan should cover the cost of the visit.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconMailFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            NPI immunisations
          </Paragraph>
          <Paragraph>
            NPIs are used to identify healthcare professionals and organizations
            in various healthcare transactions, including billing and insurance
            claims.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconPlusCircleFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            Gynaecological consultation
          </Paragraph>
          <Paragraph>
            For{' '}
            <span className="font-bold text-pink-700">1 session per year</span>,
            you get a range of preventive services, including Pap smears, breast
            exams, pelvic exams, and discussions about contraception and family
            planning.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconCreditCardFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            Minor surgery and procedures
          </Paragraph>
          <Paragraph>
            This plan typically cover a wide range of medical services up to
            <span className="font-semibold"> ₦ 50,000</span>, including minor
            surgeries and procedures.
          </Paragraph>
        </div>

        <div>
          <div className="grid place-items-center w-12 h-12 mb-5">
            <Icon name="IconMailFlush" size={24} />
          </div>
          <Paragraph className="font-semibold mb-2" size="xl">
            Antenatal care
          </Paragraph>
          <Paragraph>
            This covers up to <span className="font-bold">₦ 10,000</span>{' '}
            medical check-ups, screenings, and guidance provided to pregnant
            women to monitor the health of both the mother and the developing
            foetus throughout the pregnancy.
          </Paragraph>
        </div>
      </div>

      <div className="bg-[#F5F5F5] p-[24px] text-center mb-[72px]">
        <Paragraph className="font-bold" size="xl">
          Read our{' '}
          <Link href="/policy" className="underline text-pink-700">
            policy
          </Link>{' '}
          for all coverages
        </Paragraph>
      </div>

      <Width className="text-center" max={583} xAuto>
        <Heading as="h3" level={6} className="mb-[20px]">
          Activate Your Insurance
        </Heading>
        <Button className="mb-[32px] w-full" href="/signup/summary">
          Pay 1,350 / Month
        </Button>
        <div className="flex items-center justify-center gap-[18px]">
          <span>Set Your State Date</span>
          <Dropdown>
            <Button
              rightIcon={<Icon name="IconChevronDown" size={16} />}
              variant="ghost"
            >
              15/01/2024
            </Button>
          </Dropdown>
        </div>
      </Width>
    </Width>
  );
};
