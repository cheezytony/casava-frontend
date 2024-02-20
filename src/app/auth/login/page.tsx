'use client';

import { Button, Dropdown, FormGroup, FormInput } from '@/components';
import { useForm, useFormValidator } from '@/hooks';

export default function LoginPage(): JSX.Element {
  const { values, errors, setFieldValue } = useForm({
    initialValues: { firstName: 'Antonio', lastName: 'Okoro', email: '', age: 25 },
    validation: {
      firstName: useFormValidator().required().alphabets.only(),
      lastName: useFormValidator().required(),
      email: useFormValidator().required().string.email(),
      age: useFormValidator().required().number.min(18).number.max(25),
    },
  });

  return (
    <div className="p-10">
      <h1>Login Page</h1>
      <div className="flex flex-col items-start gap-5">
        <div className="flex gap-4 w-full">
          <FormGroup
            className="w-full"
            label="First Name"
            errors={errors.firstName}
            input={
              <FormInput
                placeholder="Enter First Name"
                value={values.firstName}
                onChange={(value) =>
                  setFieldValue(
                    'firstName',
                    value.toString().replace(/[^a-zA-Z]/g, '')
                  )
                }
              />
            }
          />
          <FormGroup
            className="w-full"
            label="Last Name"
            errors={errors.lastName}
            input={
              <FormInput
                placeholder="Enter Last Name"
                value={values.lastName}
                onChange={(value) =>
                  setFieldValue(
                    'lastName',
                    value.toString().replace(/[^a-zA-Z]/g, '')
                  )
                }
              />
            }
          />
          <FormGroup
            className="w-full"
            label="Email Address"
            errors={errors.email}
            input={
              <FormInput
                placeholder="Enter Email Address"
                value={values.email}
                onChange={(value) =>
                  setFieldValue('email', value.toString().replace(/[\s]/g, ''))
                }
              />
            }
          />
          <FormGroup
            className="w-full"
            label="Age"
            errors={errors.age}
            input={
              <FormInput
                type="number"
                placeholder="Enter Age"
                value={values.age}
                onChange={(value) => setFieldValue('age', value as number)}
              />
            }
          />
        </div>
        <div className="flex gap-4 items-center">
          <Button size="xs">Primary</Button>
          <Button size="sm">Primary</Button>
          <Button>Primary</Button>
          <Button size="lg">Primary</Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button colorScheme="secondary" size="xs">
            Secondary
          </Button>
          <Button colorScheme="secondary" size="sm">
            Secondary
          </Button>
          <Button colorScheme="secondary">Secondary</Button>
          <Button colorScheme="secondary" size="lg">
            Secondary
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button colorScheme="black" size="xs">
            Black
          </Button>
          <Button colorScheme="black" size="sm">
            Black
          </Button>
          <Button colorScheme="black">Black</Button>
          <Button colorScheme="black" size="lg">
            Black
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="outline" size="xs">
            Outline
          </Button>
          <Button variant="outline" size="sm">
            Outline
          </Button>
          <Button variant="outline">Outline</Button>
          <Button variant="outline" size="lg">
            Outline
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button variant="link" size="xs">
            Link
          </Button>
          <Button variant="link" size="sm">
            Link
          </Button>
          <Button variant="link">Link</Button>
          <Button variant="link" size="lg">
            Link
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          <Button colorScheme="primary" disabled size="xs">
            Disabled
          </Button>
          <Button colorScheme="primary" disabled size="sm">
            Disabled
          </Button>
          <Button colorScheme="primary" disabled>
            Disabled
          </Button>
          <Button colorScheme="primary" disabled size="lg">
            Disabled
          </Button>
        </div>
        {/* <ButtonGroup>
          <Button colorScheme="primary" variant="outline">
            First
          </Button>
          <Button colorScheme="primary" variant="outline">
            Second
          </Button>
          <Button colorScheme="primary" variant="outline" disabled>
            Disabled
          </Button>
        </ButtonGroup>
        <ButtonGroup size="xs">
          <Button colorScheme="primary" variant="outline">
            First
          </Button>
          <Button colorScheme="primary" variant="outline">
            Second
          </Button>
          <Button colorScheme="primary" variant="outline" disabled>
            Disabled
          </Button>
        </ButtonGroup> */}
        <Dropdown
          items={[
            [
              {
                label: (
                  <a className="flex items-start text-left">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[20px] leading-[28px]">
                        Income Protection
                      </div>
                      <div className="text-[16px]">
                        Two lines description here and there
                      </div>
                    </div>
                  </a>
                ),
              },
            ],
            [
              {
                label: (
                  <a className="flex items-start text-left">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-[20px] leading-[28px]">
                        Income Protection
                      </div>
                      <div className="text-[16px]">
                        Two lines description here and there
                      </div>
                    </div>
                  </a>
                ),
              },
            ],
            // [
            //   {
            //     heading: 'Health Insurance',
            //     title: 'Two lines description here and there',
            //   },
            // ],
            // [
            //   {
            //     heading: 'Health Cash',
            //     title: 'Two lines description here and there',
            //   },
            // ],
            // [
            //   {
            //     heading: 'Credit Life',
            //     title: 'Two lines description here and there',
            //   },
            // ],
          ]}
        >
          {<Button>Dropdown</Button>}
        </Dropdown>
      </div>
    </div>
  );
}
