export interface LoginI {
    name: string;
    slug: string;
}

export interface GenericRegisterI {
    data: LoginI
}

export interface GenericRegisterRequestI {
    name?: string;
    email?: string;
    password?: string
}
