import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../service/update-user.service';
import { CreateUserService } from '../../service/create-user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-infos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-infos.component.html',
  styleUrl: './user-infos.component.scss'
})
export class UserInfosComponent {
  userInfosForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  private readonly _updateUserService = inject(UpdateUserService);
  private readonly _createUserService = inject(CreateUserService);

  updateUser(){
    this._updateUserService.updateUser(this.userInfosForm.value as any).subscribe({
      next: () => {
        console.log('dados atualizados');
      }, error: () => {

      } 
    })
  }

  createUser() {
    this._createUserService.createUser(this.userInfosForm.value as any).subscribe({
      next: () => {
        this.userInfosForm.setErrors({'create-user-sucess': true})
      }, 
      error: (error: HttpErrorResponse) => {
        const ALREADY_EXISTING_USER = error.status === 409;

        if(ALREADY_EXISTING_USER){
          this.userInfosForm.setErrors({'existing-user-error': true});
          return
        }

        this.userInfosForm.setErrors({'created-user-error': true});
      }

    });
  }
}