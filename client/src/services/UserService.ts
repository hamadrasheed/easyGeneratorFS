import { LoginRequestI, SignUpRequestI } from "../redux/user/types";
import { ApiService } from "./ApiService";

export class UserServiceClass {
  constructor( private apiService: typeof ApiService){
    this.apiService = apiService;
  }

  async login(payload: LoginRequestI) {
    return this.apiService.post("/user/login", {
      ...payload
    })
  }

  async signUp(payload: SignUpRequestI) {
    return this.apiService.post("/user/sign-up", {
      ...payload
    })
  }
}

export const UserService = new UserServiceClass(ApiService)