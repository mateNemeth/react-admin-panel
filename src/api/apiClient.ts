import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Notifications } from '../constants/notifications';

export interface SuccessResponse<T> {
  status: 'OK';
  data: T;
}

export interface ErrorResponse {
  status: 'ERROR';
  messages: (keyof typeof Notifications)[];
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export const isSuccessResponse = <T>(
  response: ApiResponse<T> | undefined
): response is SuccessResponse<T> => {
  return response?.status === 'OK';
};

export enum HttpMethods {
  POST = 'post',
  GET = 'get',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}
export interface HttpRequestConfig<T> {
  method: HttpMethods;
  headers?: Record<string, string>;
  data?: T;
  token?: string;
}
/**
 * API request with 2 generic types: R is the response type, T is the request data object type.
 * @param endpoint - URL that comes after the baseurl see {@link EndPoints}
 * @param config - the request object see {@link HttpRequestConfig}
 * @returns Promise<R>
 */
const client = async <R = unknown, T = undefined>(
  endpoint: string,
  {
    data,
    method,
    headers = {
      'Content-Type': 'application/json',
    },
    token,
  }: HttpRequestConfig<T>
): Promise<R> => {
  const config: AxiosRequestConfig<T> = {
    method,
    data,
    baseURL: process.env.REACT_APP_API_URL,
    url: endpoint,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      ...headers,
    },
  };

  return axios(config).then((response: AxiosResponse<R>) => response.data);
};

export { client };
