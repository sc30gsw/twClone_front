export type User = {
  username: string;
  password: string;
};

export type NewUser = User & {
  confirmPassword: string;
};
