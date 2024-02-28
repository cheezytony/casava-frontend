import React, { useMemo, useRef, useState, useCallback } from 'react';
import { FormValidationRule, FormValidatorProtoype } from './rules';

// Define the type for form input values.
export type FormInputValue = string | number | boolean | File | Date | null | undefined;

// Configuration interface for the useForm hook.
export interface UseFormConfig<TKeys extends Record<string, FormInputValue>> {
  initialValues: TKeys; // Initial values for form fields.
  validation?: Partial<Record<keyof TKeys, FormValidatorProtoype<TKeys>>>; // Validation rules for each field.
  validateOnSubmit?: boolean; // Whether to validate all fields on form submission.
  validateOnInit?: boolean; // Whether to validate all fields on form initialization.
  validateAllRulesAtOnce?: boolean;
  onSubmit?: (
    values: Record<keyof TKeys, FormInputValue>,
    isAllValid: boolean
  ) => void; // Callback for form submission.
}

// Utility function to transform keys of an object into a specified value.
const transformKeys = <TKeys extends Record<string, FormInputValue>, TValue>(
  keys: TKeys,
  value: TValue | ((name: keyof TKeys) => TValue)
) =>
  Object.keys(keys).reduce((acc, key) => {
    const computedValue =
      typeof value === 'function'
        ? (value as (name: keyof TKeys) => TValue)(key)
        : value;
    acc[key as keyof TKeys] = computedValue;
    return acc;
  }, {} as Record<keyof TKeys, TValue>);

// Custom hook for form management.
export const useForm = <TKeys extends Record<string, FormInputValue>>({
  initialValues,
  validation,
  validateOnInit = false,
  validateOnSubmit = true,
  validateAllRulesAtOnce = false,
  onSubmit,
}: UseFormConfig<TKeys>) => {
  const initial = useRef(initialValues);
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState(transformKeys(initialValues, false));
  const [valid, setValid] = useState(
    transformKeys(initialValues, (name) => {
      const validator = validation?.[name];
      if (validator?.rules.nullable) return true;
      return false;
    })
  );
  const [errors, setErrors] = useState<
    Record<keyof TKeys, Record<FormValidationRule, string> | null>
  >(transformKeys(initialValues, null));

  const lastUpdatedFields = useRef<Array<keyof TKeys>>(
    validateOnInit && initialValues && Object.keys(initialValues).length > 0
      ? Object.keys(initialValues)
      : []
  );

  // Determines if the form is valid based on the 'valid' state.
  const isAllValid = useMemo(
    () => Object.values(valid).every(Boolean),
    [valid]
  );

  // Updates a single field's value and optionally validates it.
  const setFieldValue = useCallback(
    <TKey extends keyof TKeys>(
      key: TKey,
      value: TKeys[TKey],
      validate = true
    ) => {
      setValues((prev) => ({ ...prev, [key]: value }));
      setTouched((prev) => ({ ...prev, [key]: true }));
      if (validate && !lastUpdatedFields.current.includes(key)) {
        lastUpdatedFields.current.push(key);
      }
    },
    []
  );

  // Sets an error for a specific field.
  const setFieldError = useCallback(
    <TKey extends keyof TKeys>(key: TKey, error: string) => {
      setErrors((prev) => ({ ...prev, [key]: { error } }));
    },
    []
  );

  // Bulk updates values and optionally validates them.
  const updateValues = useCallback(
    (newValues: Partial<TKeys>, validateAfterUpdate = false) => {
      setValues((prevValues) => ({ ...prevValues, ...newValues }));
      Object.keys(newValues).forEach((key) => {
        setTouched((prevTouched) => ({ ...prevTouched, [key]: true }));
        if (validateAfterUpdate && !lastUpdatedFields.current.includes(key)) {
          lastUpdatedFields.current.push(key as keyof TKeys);
        }
      });
    },
    []
  );

  // Bulk updates errors for multiple fields.
  const updateErrors = useCallback(
    (
      newErrors: Partial<
        Record<keyof TKeys, Record<FormValidationRule, string> | null>
      >
    ) => {
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
    },
    []
  );

  // Resets the form to its initial state.
  const resetForm = useCallback(() => {
    setValues(initial.current);
    setErrors(transformKeys(initialValues, null));
    setTouched(transformKeys(initialValues, false));
    setValid(
      transformKeys(initialValues, (name) => {
        const validator = validation?.[name];
        if (validator?.rules.nullable) return true;
        return false;
      })
    );
  }, [initialValues, validation]);

  // Validates a single field against its validation rules.
  const validateField = useCallback(
    <TKey extends keyof TKeys>(key: TKey): boolean => {
      const validator = validation?.[key];
      if (!validator) return true; // Assume valid if no validator is provided.

      const fieldErrors: Partial<Record<FormValidationRule, string>> = {};
      let isValid = true;

      for (const ruleName in validator.rules) {
        const { message, test } = validator.rules[ruleName];
        if (!test(values[key], values)) {
          isValid = false;
          fieldErrors[ruleName as FormValidationRule] = message;
          if (!validateAllRulesAtOnce) break;
        }
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: isValid
          ? null
          : (fieldErrors as Record<FormValidationRule, string>),
      }));
      setValid((prevValid) => ({ ...prevValid, [key]: isValid }));

      return isValid;
    },
    [values, validation]
  );

  // Validates the entire form.
  const validateForm = useCallback(
    () =>
      Object.keys(values)
        .map((key) => validateField(key as keyof TKeys))
        .every((result) => result),
    [validateField, values]
  );

  // Handles form submission.
  const handleSubmit = useCallback(() => {
    onSubmit?.(values, validateOnSubmit ? validateForm() : isAllValid);
  }, [validateOnSubmit, values, isAllValid, onSubmit, validateForm]);

  // Effect to validate fields marked for validation.
  React.useEffect(() => {
    lastUpdatedFields.current.forEach((field) => validateField(field));
    lastUpdatedFields.current = [];
  }, [validateField, values]);

  return {
    errors,
    touched,
    isAllValid,
    valid,
    values,
    handleSubmit,
    resetForm,
    setFieldError,
    setFieldValue,
    updateValues,
    updateErrors,
    validateField,
    validateForm,
  };
};

// Factory function for form validators.
export const useFormValidator = () => new FormValidatorProtoype();
