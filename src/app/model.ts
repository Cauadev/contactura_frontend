export interface Authentication{
    username: string,
    password: string
}

export interface Contact{
    id?: number;
    name: string;
    email: string;
    phone: string;
}

export interface User{
    id?: number;
    name: string;
    username: string;
    password: string;
    admin: boolean;
}