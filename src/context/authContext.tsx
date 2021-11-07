import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  client,
  ApiResponse,
  HttpRequestConfig,
  isSuccessResponse,
} from '../api/apiClient';
import { useGetUser } from '../api/authentication';
import { Roles } from '../constants/roles';
import {
  getItemFromStorage,
  LocalStorageKeys,
  setItemToStorage,
} from '../utils/localStorage';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Roles;
}

export interface IAuthContext {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
}

const AuthContext = React.createContext<IAuthContext | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const { data: userResponse, refetch } = useGetUser(token, false);

  useEffect(() => {
    const jwt = getItemFromStorage(LocalStorageKeys.LOCAL_STORAGE_AUTH_KEY);
    if (jwt !== null) {
      setToken(jwt);
    }
  }, []);

  useEffect(() => {
    if (token && !user) refetch();
  }, [token]);

  useEffect(() => {
    if (isSuccessResponse(userResponse)) {
      setUser(userResponse.data);
    }
  }, [userResponse]);

  const login = (userData: User, jwtToken: string) => {
    setItemToStorage(LocalStorageKeys.LOCAL_STORAGE_AUTH_KEY, jwtToken);
    setUser(userData);
    setToken(jwtToken);
  };

  const values = useMemo(() => ({ user, login, token }), [user, login, token]);

  return <AuthContext.Provider value={values} {...props} />;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useClient = <R, T>() => {
  const auth = useAuth();

  return useCallback(
    (endpoint: string, requestConfig: HttpRequestConfig<T>) =>
      client<ApiResponse<R>, T>(endpoint, {
        ...requestConfig,
        token: auth.token ?? undefined,
      }),
    [auth]
  );
};

export { AuthProvider, useAuth, useClient };
