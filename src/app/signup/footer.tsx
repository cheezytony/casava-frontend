import { Button } from '@/components';
import { useOnboarding } from '@/hooks';

export const SignupFooter: React.FC = () => {
  const { canShowFooter, nextAction } = useOnboarding();

  return (
    <div
      className={`bg-white border-t border-t-[#F2F2F7] duration-300 grid place-items-center fixed bottom-0 left-0 w-full py-md px-lg h-[85px] ${
        canShowFooter ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {nextAction?.href ? (
        <Button
          href={
            !nextAction.isLoading || nextAction?.canNavigate
              ? nextAction.href
              : undefined
          }
          disabled={!nextAction?.canNavigate}
          isLoading={nextAction.isLoading}
          isRounded
          rightIcon="IconChevronRight"
          size="lg"
        >
          Continue
        </Button>
      ) : nextAction?.action && (
        <Button
          disabled={!nextAction?.canNavigate}
          isLoading={nextAction.isLoading}
          isRounded
          rightIcon="IconChevronRight"
          size="lg"
          onClick={nextAction?.action}
        >
          Continue
        </Button>
      )}
    </div>
  );
};
