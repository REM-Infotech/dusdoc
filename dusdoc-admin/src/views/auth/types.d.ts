import type { AxiosResponse } from "axios";

interface LoginResponse extends AxiosResponse {
  data?: {
    message?: string;
    token?: string;
  };
}

export type { LoginResponse };
