import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {
  private readonly _httpClient = inject(HttpClient);

  updateUser(userInfos: {name:  string; email:  string; username:  string; password:  string }){
    const headers = new HttpHeaders().set('authorization', 'Bearer ' + localStorage.getItem('token')!);
    return this._httpClient.put<{message:  string; token: string}>('http://localhost:3000/update-user', userInfos, {
      headers,
    }).pipe(
      map((updateUserResponse: {message:  string; token: string}) => {
        localStorage.setItem('token', updateUserResponse.token);
        return updateUserResponse;
      })
    );
  }
}
