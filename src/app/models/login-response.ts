export interface LoginResponse {
  userId: number;
  username: string;
  email: string;
  token: string;
  role: string;
  message: string;
}