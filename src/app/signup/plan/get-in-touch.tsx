import { Avatar, Button, Paragraph, Width } from '@/components';

export default function GetInTouch() {
  return (
    <Width className="bg-[#F2F2F7] flex flex-col items-center justify-center p-8 rounded-2xl">
      <div className="flex items-baseline isolate">
        <Avatar
          src="/images/avatar/avatar-2.png"
          className="z-[-1]"
          size={48}
        />
        <Avatar
          src="/images/avatar/avatar-3.png"
          className="ml-[-8px]"
          size={56}
        />
        <Avatar
          src="/images/avatar/avatar-4.png"
          className="ml-[-8px] z-[-1]"
          size={48}
        />
      </div>
      <div className="text-center">
        <Paragraph className="font-semibold mb-[8px]" size="xl">
          Still have questions?
        </Paragraph>
        <Paragraph className="text-[#808080] mb-[32px]" size="lg">
          Can&apos;t find the answer you&apos;re looking for? Please chat to our
          friendly team.
        </Paragraph>
        <Button>Get in touch</Button>
      </div>
    </Width>
  );
}