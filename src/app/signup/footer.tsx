import { Button } from '@/components';
import { useOnboarding } from '@/hooks';

export const SignupFooter: React.FC = () => {
  const { nextPage, canGoForward } = useOnboarding();
  
  if (!nextPage) return null;

  return (
    <div className="bg-white border-t border-t-[#F2F2F7] grid place-items-center fixed bottom-0 left-0 w-full py-md px-lg h-[85px]">
      <Button
        href={nextPage}
        disabled={!canGoForward}
        isRounded
        rightIcon="IconChevronRight"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};
