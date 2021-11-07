import React, { useEffect } from 'react';
import {
  DeepPartial,
  FieldError,
  FormProvider,
  Path,
  UnpackNestedValue,
  useForm,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './Form.module.scss';

export interface IDefaultControlProps {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
  info?: string;
  disabled?: boolean;
  variant?: FormVariants;
  rounded?: boolean;
  autoComplete?: string;
}

export type FormVariants = 'dark' | 'light';
export type WithFormError<T> = T & { formError: string };

export type FormOnSubmit<T> = (
  data: UnpackNestedValue<T>,
  setError: UseFormSetError<WithFormError<T>>
) => void;

export const isFieldError = (error: unknown): error is FieldError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

export type FormErrorsWithCustomError<T> = T & { formError?: FieldError };

export interface IFormProps<T> {
  onSubmit: FormOnSubmit<T>;
  children: React.ReactNode | React.ReactNode[];
  onControlValueChange?: (
    values: UnpackNestedValue<WithFormError<T>>,
    setValue: UseFormSetValue<WithFormError<T>>
  ) => void;
  defaultValues?: UnpackNestedValue<DeepPartial<WithFormError<T>>>;
  validationSchema?: yup.SchemaOf<{} & T>;
}

const Form = <T,>({
  defaultValues,
  children,
  onSubmit,
  onControlValueChange,
  validationSchema,
}: IFormProps<T>) => {
  const methods = useForm<WithFormError<T>>({
    defaultValues,
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
  });
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState,
    reset,
    setValue,
    getValues,
  } = methods;
  const errors = formState.errors as FormErrorsWithCustomError<
    typeof formState.errors
  >;

  const handleFormChange = () => {
    if (errors.formError) {
      clearErrors('formError' as Path<WithFormError<T>>); // sort of hack, but react-hook-form using string template literals internally...
    }

    if (onControlValueChange) {
      onControlValueChange(getValues(), setValue);
    }
  };

  const handleFormSubmit = (values: UnpackNestedValue<T>) => {
    onSubmit(values, setError);
  };

  useEffect(() => {
    if (!formState.isDirty && defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, formState.isDirty, reset]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        onChange={handleFormChange}
      >
        {children}
        {errors.formError ? (
          <div className={styles.alert}>{errors.formError.message}</div>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default Form;
