import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ErrorFeedback.module.scss';

interface IErrorFeedbackProps {
  message: string;
}

const ErrorFeedback = (props: IErrorFeedbackProps) => {
  const { message } = props;

  return (
    <p className={styles.errorMessage}>
      <FontAwesomeIcon icon={faExclamationTriangle} /> {message}
    </p>
  );
};

export default ErrorFeedback;
