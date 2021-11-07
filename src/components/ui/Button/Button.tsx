import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  type?: string;
}

const Button = ({
  children,
  onClick,
  className,
  disabled,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.button, className, {
        [styles.disabled]: disabled || loading,
      })}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <FontAwesomeIcon spin icon={faCircleNotch} /> : null}
      {children}
    </button>
  );
};

export default Button;
