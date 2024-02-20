import { Button, Icon, Logo, ProgressBar } from '@/components';
import { OnboardingContext } from '@/contexts/OnboardingContext';
import React, { useContext } from 'react';

export const SignupHeader: React.FC = () => {
  const { canRestart, previousPage, progress } = useContext(OnboardingContext);

  return (
    <div className="bg-white fixed top-0 left-0 w-full">
      <div className="flex items-center gap-md h-[65px] px-xl relative">
        {previousPage && (
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2"
            colorScheme="black"
            href={previousPage}
            leftIcon={<Icon name="IconChevronLeft" size="sm" />}
            size="lg"
            variant="link"
          >
            Back
          </Button>
        )}
        <div className="mx-auto">
          <Logo color="pink" />
        </div>
      </div>
      <ProgressBar progress={progress} transition />
    </div>
  );
};
