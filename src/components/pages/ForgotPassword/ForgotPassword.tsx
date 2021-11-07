import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { ValidationMessages } from '../../../constants/validationMessages';
import Form, { FormOnSubmit } from '../../ui/Form/Form';
import TextInput from '../../ui/Form/Controls/TextInput/TextInput';
import Button from '../../ui/Button/Button';
import { AppRoutes } from '../../../constants/routes';
import { useForgotPassword } from '../../../api/authentication';
import { isSuccessResponse } from '../../../api/apiClient';
import { Notifications } from '../../../constants/notifications';
import useNotifications from '../../../hooks/useNotifications';

interface IForgotPasswordForm {
  email: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
});

const ForgotPassword = () => {
  const forgotPasswordMutation = useForgotPassword();
  const notifications = useNotifications();

  const onSubmit: FormOnSubmit<IForgotPasswordForm> = (data) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: (response) => {
        if (isSuccessResponse(response)) {
          notifications.success(Notifications.FORGOT_PASSWORD_SUCCESS);
        } else {
          notifications.handleErrorResponse(response);
        }
      },
    });
  };

  return (
    <Form<IForgotPasswordForm>
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <TextInput name="email" label="Email" />
      <Button type="submit" loading={false}>
        Request new password
      </Button>
      <Link to={AppRoutes.LOGIN}>Login</Link>
    </Form>
  );
};

export default ForgotPassword;
