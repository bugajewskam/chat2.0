export interface IMessage {
  text: string;
  id: number;
  type: string;
}
export interface IUser {
  name: string;
  messages: IMessage[];
}

export interface IRoom {
  name: string;
  users: IUser[];
  messages: IMessage[];
}
export interface IChat extends IMessage {
  type: string;
}
