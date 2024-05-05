import { 
    UserActionEnum,
    UserStore,
    UserActions,
    UserInformation
} from "./types";
  
const initialState: UserStore =  {
    error: null,
    data: null
}
  
export default function reduce(state: UserStore = initialState, action: UserActions): UserStore {
    switch(action.type) {

      case UserActionEnum.LOGIN_START: {
        return {
          ...state,
        }
      }
  
      case UserActionEnum.LOGIN_SUCCESS: {
        return {
          ...state,
          data: action.payload.data as UserInformation
        }
      }
  
      case UserActionEnum.LOGIN_ERROR: {
        return {
          ...state,
          error: action.payload.error
        }
      }

      case UserActionEnum.SIGNUP_START: {
        return {
          ...state,
        }
      }
  
      case UserActionEnum.SIGNUP_SUCCESS: {
        return {
          ...state,
          data: action.payload.data as UserInformation
        }
      }
  
      case UserActionEnum.SIGNUP_ERROR: {
        return {
          ...state,
          error: action.payload.error
        }
      }
  
      default: 
          return state
    }
}