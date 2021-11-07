import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';
import { IDefaultControlProps } from '../../Form';
import ErrorFeedback from '../ErrorFeedback/ErrorFeedback';

import styles from './TextInput.module.scss';

interface ITextInputProps extends IDefaultControlProps {
  type?: 'text' | 'email' | 'password';
}

const TextInput = (props: ITextInputProps) => {
  const {
    name,
    label,
    placeholder,
    className,
    disabled,
    type = 'text',
    autoComplete,
  } = props;
  const { register, formState } = useFormContext();

  return (
    <div className={classNames(styles.container, className)}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        {...register(name)}
        className={classNames(styles.input, className, {
          [styles.invalid]: formState.errors[name],
        })}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        data-notranslate
        autoComplete={autoComplete}
      />
      {formState.errors[name]?.message ? (
        <ErrorFeedback message={formState.errors[name].message} />
      ) : null}
    </div>
  );
};

export default TextInput;
