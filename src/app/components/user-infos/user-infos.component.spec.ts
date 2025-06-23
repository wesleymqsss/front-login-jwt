import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../service/update-user.service';

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
  
  updateUser() {
    this._updateUserService.updateUser(this.userInfosForm.value as any).subscribe({
      next: (updateUserResponse) => {
        console.log('dados atualizados');
      }, error: () => {

      }
    })
  }
}



