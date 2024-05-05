export interface UserInformation {
    _id: string;
    name: string;
    email?: string;
    token: string;
}

export interface UserLoginResponseI {
  message: string;
  result: UserInformation
}


  
export interface UserStore {
    data: UserInformation | null;
    error?: unknown;
}

export enum UserActionEnum {
    LOGIN_START = 'LOGIN_START',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    SIGNUP_START = 'SIGNUP_START',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNUP_ERROR = 'SIGNUP_ERROR',
}

export interface LoginRequestI {
  email: string;
  password: string;
}

export interface SignUpRequestI {
  email: string;
  password: string;
  name: string;
}

interface LoginStart {
    type: UserActionEnum.LOGIN_START,
    payload: LoginRequestI
}
  
interface LoginSuccess {
    type: UserActionEnum.LOGIN_SUCCESS,
    payload: {
      data: unknown;
    }
}
  
interface LoginError {
    type: UserActionEnum.LOGIN_ERROR,
    payload: {
        error: unknown;
    }
}

interface SignUpStart {
  type: UserActionEnum.SIGNUP_START,
  payload: SignUpRequestI
}

interface SignUpSuccess {
  type: UserActionEnum.SIGNUP_SUCCESS,
  payload: any
}

interface SignUpError {
  type: UserActionEnum.SIGNUP_ERROR,
  payload: {
    error: unknown;
}
}

export type UserActions = LoginStart 
    | LoginSuccess 
    | LoginError 
    | LoginStart
    | SignUpStart
    | SignUpSuccess
    | SignUpError;
  
  