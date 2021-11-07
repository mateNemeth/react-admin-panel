import { useMutation, useQuery } from 'react-query';
import { ApiCache } from '../constants/cache';
import { ApiRoutes } from '../constants/routes';
import { User } from '../context/authContext';
import { client, ApiResponse, HttpMethods } from './apiClient';

export interface UseLoginRequest {
  email: string;
  password: string;
}

export interface UseLoginResponse {
  token: string;
  user: User;
}

const useLogin = () => {
  return useMutation((request: UseLoginRequest) =>
    client<ApiResponse<UseLoginResponse>, UseLoginRequest>(ApiRoutes.LOGIN, {
      data: request,
      method: HttpMethods.POST,
    })
  );
};

export interface UseForgotPasswordRequest {
  email: string;
}

const useForgotPassword = () => {
  return useMutation((request: UseForgotPasswordRequest) =>
    client<ApiResponse<unknown>, UseForgotPasswordRequest>(
      ApiRoutes.FORGOTTEN_PASSWORD,
      {
        data: request,
        method: HttpMethods.POST,
      }
    )
  );
};

export interface UseGetUserRequest {
  id: number;
}

const useGetUser = (token: string | null, enabled: boolean) => {
  return useQuery(
    [ApiCache.USER],
    () =>
      client<ApiResponse<User>>(ApiRoutes.GET_ACCOUNT, {
        method: HttpMethods.GET,
        token: token !== null ? token : undefined,
      }),
    {
      enabled,
    }
  );
};

export { useLogin, useForgotPassword, useGetUser };
