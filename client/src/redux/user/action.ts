import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../reduxStore";
import { UserService } from "../../services/UserService";

import {
    LoginRequestI,
    SignUpRequestI,
    UserActionEnum,
    UserLoginResponseI,
} from "./types";

export const login = (requestData: LoginRequestI, onSuccess: () => void, onError: (errors: string) => void ) => {

  const { ...payload } = requestData;

  return async (dispatch: ThunkDispatch<{}, {}, any>, getState: () => RootState) => {
    dispatch({
      type: UserActionEnum.LOGIN_START,
      payload
    })

    try {

      const responseData: UserLoginResponseI = await UserService.login(payload)

      dispatch({
        type: UserActionEnum.LOGIN_SUCCESS,
        payload: {
          data: responseData
        }
      });

      const { result: { token } } = responseData;
      localStorage.setItem('token', token)
      onSuccess();
  
    } catch(_error: any) {

      const errorFromServer: string = _error?.response?.data?.message || "Login Failed!";

      dispatch({
        type: UserActionEnum.LOGIN_ERROR,
        payload: {
          error: errorFromServer
        }
      })

      onError(errorFromServer); 
    }
  }
}

export const signUp = (requestData: SignUpRequestI, onSuccess: () => void, onError: (errors: string) => void ) => {

  const { ...payload } = requestData;

  return async (dispatch: ThunkDispatch<{}, {}, any>, getState: () => RootState) => {
    dispatch({
      type: UserActionEnum.LOGIN_START,
      payload
    })

    try {

      const responseData: UserLoginResponseI = await UserService.signUp(payload)

      dispatch({
        type: UserActionEnum.LOGIN_SUCCESS,
        payload: {
          data: responseData
        }
      });

      const { result: { token } } = responseData;
      localStorage.setItem('token', token)
      onSuccess();
  
    } catch(_error: any) {

      const errorFromServer: string = _error?.response?.data?.message || "Login Failed!";

      dispatch({
        type: UserActionEnum.LOGIN_ERROR,
        payload: {
          error: errorFromServer
        }
      })

      onError(errorFromServer); 
    }
  }
}
