import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../constants/routes';
import TextInput from '../../ui/Form/Controls/TextInput/TextInput';
import Form, { FormOnSubmit } from '../../ui/Form/Form';
import Button from '../../ui/Button/Button';
import { ValidationMessages } from '../../../constants/validationMessages';
import { useLogin } from '../../../api/authentication';
import { isSuccessResponse } from '../../../api/apiClient';
import { useAuth } from '../../../context/authContext';
import useNotifications from '../../../hooks/useNotifications';

interface ILoginForm {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string().required(ValidationMessages.REQUIRED),
  email: Yup.string()
    .email(ValidationMessages.EMAIL)
    .required(ValidationMessages.REQUIRED),
});

const Login = () => {
  const notifications = useNotifications();
  const { login } = useAuth();
  const loginMutation = useLogin();

  const onSubmit: FormOnSubmit<ILoginForm> = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        if (isSuccessResponse(response)) {
          login(response.data.user, response.data.token);
        } else {
          notifications.handleErrorResponse(response);
        }
      },
    });
  };

  return (
    <Form<ILoginForm> onSubmit={onSubmit} validationSchema={validationSchema}>
      <TextInput name="email" label="Email" />
      <TextInput name="password" type="password" label="Password" />
      <Button type="submit" loading={loginMutation.isLoading}>
        Login
      </Button>
      <Link to={AppRoutes.FORGOTTEN_PASSWORD}>Forgot password?</Link>
    </Form>
  );
};

export default Login;
