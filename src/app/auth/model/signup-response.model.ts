export interface SignUpResponse {
  code: number;
  message: string;
}

export interface SignUpResponseError {
  code: number;
  error: string
  message: string;
}
