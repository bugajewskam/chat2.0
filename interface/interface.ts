export interface IMessage{
    text: string;
    id: number;

}
export interface IUser{
    name: string;
    messages: IMessage[];
}

export interface IRoom{
    name: string;
    users: IUser[];
    messages: IMessage[];
}