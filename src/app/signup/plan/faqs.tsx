import { Accordion, Heading, Paragraph, Width } from '@/components';

export const PlanFaqs = () => {
  const faqs = [
    {
      label: 'Is there a free trial available?',
      content:
        'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      label: 'Can I change my plan later?',
      content:
        'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      label: 'What is your cancellation policy?',
      content:
        'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      label: 'Can other info be added to an invoice?',
      content:
        'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      label: 'How does payment work?',
      content:
        'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
    {
      label: 'How do I change my account email?',
      content:
        'Yes, you can try us for free for 30 days. If you want, we\'ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    },
  ];
  return (
    <Width max={768}>
      <div className="text-center mb-[48px]">
        <Heading as="h3" level="lg">
          Frequently asked questions
        </Heading>
        <Paragraph size='xl'>
          Everything you need to know about the product and payment.
        </Paragraph>
      </div>
      <Accordion allowToggle allowMultiple items={faqs} />
    </Width>
  );
};
