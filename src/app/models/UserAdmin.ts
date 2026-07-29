export interface UserAdmin {
  userId: number;
  username: string;
  email: string;
  role: string;
  originalRole?: string;
}