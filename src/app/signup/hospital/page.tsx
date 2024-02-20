'use client';

import {
  Avatar,
  Badge,
  Button,
  CustomMiddleware,
  Form,
  FormGroup,
  FormSelect,
  Heading,
  Paragraph,
} from '@/components';
import { Hospital } from './hospital';
import { useOnboarding } from '@/hooks/onboarding';
import { useEffect, useMemo, useState } from 'react';

export default function SignupHospitalPage() {
  const previousPage = '/signup';
  const {
    insuranceProduct,

    state,
    setState,

    lga,
    setLga,

    hospital,
    setHospital,

    setCanGoForward,
    setNextPage,
    setPreviousPage,
    setProgress,
  } = useOnboarding();
  const middleware = () => !!insuranceProduct;
  const [states, setStates] = useState<Array<{ title: string; value: number }>>(
    [
      { title: 'Lagos', value: 1 },
      { title: 'Abuja', value: 2 },
      { title: 'Kano', value: 3 },
      { title: 'Oyo', value: 4 },
    ]
  );
  const [lgas, setLgas] = useState<Array<{ title: string; value: number }>>([
    { title: 'Ikeja', value: 1 },
    { title: 'Lekki', value: 2 },
    { title: 'Victoria Island', value: 3 },
    { title: 'Surulere', value: 4 },
  ]);
  const [hospitals, setHospitals] = useState([
    'oneness',
    'maranatha',
    'test',
    'tony',
  ]);
  const selectLga = (lga: { title: string; value: number }) => {
    setLga(lga.value);
  };
  const selectedState = useMemo(
    () => states.find(({ value }) => value == state),
    [state, states]
  );

  useEffect(() => {
    setPreviousPage(previousPage);
    setProgress(10);
    setNextPage('/signup/profile');
    return () => {
      setPreviousPage(null);
      setNextPage(null);
      setProgress(0);
    };
  }, [setNextPage, setPreviousPage, setProgress]);

  useEffect(() => {
    setCanGoForward(!!hospital);
    return () => setCanGoForward(false);
  }, [hospital, setCanGoForward]);
  
  return (
    <CustomMiddleware middleware={middleware} redirectTo={previousPage}>
      <div>
        <div className="flex flex-col gap-md items-center text-center mb-lg">
          <Avatar size="xl" />
          <Heading as="h2" level={2}>
            Choose a primary hospital <br className="hidden md:block" />
            close to you
          </Heading>
          <Paragraph size="xl">You can change this later on</Paragraph>
        </div>

        <Form className="flex flex-col items-center mb-lg">
          <div className="mb-xl max-w-full w-[33.25rem]">
            <FormGroup
              label="State"
              input={
                <FormSelect
                  leftIcon=""
                  options={states}
                  placeholder="Select State"
                />
              }
            />
          </div>

          <div className="flex flex-wrap gap-x-md gap-y-lg">
            {lgas.map((item) => (
              <Badge
                colorScheme={item.value === lga ? 'primary' : 'gray'}
                key={item.value}
                onClick={() => selectLga(item)}
                isRounded
              >
                {item.title}
              </Badge>
            ))}
          </div>
        </Form>

        <div
          className={`grid grid-cols-1 ${
            hospitals.length >= 2 && 'sm:grid-cols-2'
          } ${
            hospitals.length >= 3 && 'lg:grid-cols-3'
          } mx-auto gap-md justify-center items-center w-fit`}
        >
          {hospitals.map((item) => (
            <Hospital
              key={item}
              isActive={hospital === item}
              slug={item}
              onClick={() =>
                hospital === item ? setHospital(null) : setHospital(item)
              }
            />
          ))}
        </div>

        <div className="bg-white border-t border-t-[#F2F2F7] grid place-items-center fixed bottom-0 left-0 w-full py-md px-lg h-[85px]">
          <Button
            href="/signup/profile"
            disabled={!hospital}
            rightIcon="IconChevronRight"
            isRounded
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    </CustomMiddleware>
  );
}
