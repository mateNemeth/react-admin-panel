import { QueryClient, QueryClientProvider } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { IContextProvider } from './appProviders';

const ClientProvider = ({ children }: IContextProvider) => {
  const { addToast } = useToasts();

  const generalErrorHandling = (error: unknown) => {
    if (error instanceof Error) {
      addToast(error.message, { appearance: 'error', autoDismiss: false });
    } else {
      addToast(JSON.stringify(error), {
        appearance: 'error',
        autoDismiss: false,
      });
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        onError: generalErrorHandling,
      },
      queries: {
        onError: generalErrorHandling,
        suspense: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientProvider;
