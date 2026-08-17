export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterOrLoginMutation {
  username: string;
  password: string;
}