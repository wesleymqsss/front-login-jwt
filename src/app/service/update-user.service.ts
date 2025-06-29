import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUserRequest } from '../interfaces/user-request.interface';
import { IUpdateUserResponse } from '../interfaces/update-user-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private readonly _httpClient = inject(HttpClient);

  updateUser(userInfos: IUserRequest){
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token')!);
    return this._httpClient.put<IUpdateUserResponse>('http://localhost:3000/update-user', userInfos, {
      headers,
    }).pipe(
      map((updateUserResponse: IUpdateUserResponse) => {
        localStorage.setItem('token', updateUserResponse.token);
        return updateUserResponse;
      })
    );
  }
}
