import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserVM } from '../../../models/userVM';
import { AuthService } from '../../../services/auth.service';
import { MassageService } from '../../../services/massage.service';
import { Lockup } from '../../../models/lockup.model';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrl: './account-add.component.css'
})
export class AccountAddComponent {
  userVM: UserVM = new UserVM(0, '', '', '', '', 0);
  userRoles: Lockup[] = [];
  errorMessage: any = '';
  addForm: any;

  constructor(private authService: AuthService, 
              private router: Router, 
              private massageService: MassageService) {
    
   }

  ngOnInit() {
    this.intiateform();
    
    this.authService.getRoles().subscribe({
      next: (result) => 
        {
          if(!result.isSucess){
            this.errorMessage = result.error;
          }
          
          this.userRoles = result.data;
        },
        error: (e) => {
          this.errorMessage = e.message;
          //console.log(e);
        },
        complete: () => {
        }
    });
  }

  intiateform() {
    this.addForm = new FormGroup({
      // Define your form controls here
      id: new FormControl(0, Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      roleId: new FormControl(0, Validators.required)
    });
  }

submitForm(model: any) {
  console.log(JSON.stringify(model));
  if(this.addForm.valid){
    this.authService.addUser(model).subscribe({
    next: (result) => 
      {
        if(!result.isSucess){
          this.massageService.showMessage('error', result.error);
        }
        else{
          this.massageService.showMessage('success', 'Season added successfully');
        }
      },
      error: (e) => {
        this.massageService.showMessage('error', e.message);
        this.addForm.reset();
      },
      complete: () => {
        console.info('complete');
        this.addForm.reset();
      }
  });
}
else{
  Object.keys(this.addForm.controls).forEach(key => {
    this.addForm.controls[key].markAsDirty();
  });
}
  }
}
