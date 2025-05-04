export type QueryMethod = "post" | "put" | "patch" | "delete";

export interface ApiResponseSuccess<T> {
  status: string;
  message: string;
  data: T | null;
}

export interface ApiResponseError {
  status: string;
  message: string;
  data: null;
}

export interface SignInResponse {
  token: string;
  role: string;
  cookie: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  profilePhoto?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

