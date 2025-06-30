import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserRequest } from '../interfaces/user-request.interface';
import { ICreateUserResponse } from '../interfaces/create-user-response.interface';
import { AUTH_TOKEN_ENABLED } from '../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly _httpClient = inject(HttpClient);

  createUser(newUser: IUserRequest) {
      const token = localStorage.getItem('token')
      console.log('Token recuperado do localStorage:', token); 
    return this._httpClient.post<ICreateUserResponse>('http://localhost:3000/create-user', newUser, {context: new HttpContext().set(AUTH_TOKEN_ENABLED, true)});
  }

}
