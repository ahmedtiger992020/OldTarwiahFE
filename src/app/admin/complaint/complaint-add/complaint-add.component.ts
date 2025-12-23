import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { ComplaintService } from '../../../services/complaint.service';
import { MassageService } from '../../../services/massage.service';

@Component({
  selector: 'app-complaint-add',
  templateUrl: './complaint-add.component.html',
  styleUrl: './complaint-add.component.css'
})
export class ComplaintAddComponent implements OnInit {
  addForm: any;
  startDate: any = new Date;
  endDate: any = new Date;

  constructor(private complaintService: ComplaintService, 
              private router: Router,
              private messageService: MassageService) {

  }

  ngOnInit(): void {
    this.intiateform();
  }
  
  intiateform() {
    this.addForm = new FormGroup({
      // Define your form controls here
       id: new FormControl(0, Validators.required),
       nameAr: new FormControl('', Validators.required),
       nameEn: new FormControl('', Validators.required),
       nameFa: new FormControl('', Validators.required),
       nameFr: new FormControl('', Validators.required),
       nameId: new FormControl('', Validators.required),
       nameTr: new FormControl('', Validators.required),
       nameUr: new FormControl('', Validators.required)
    });
  }

  submitForm(model: any) {
    if(this.addForm.valid){
    this.complaintService.addComplaint(model).subscribe({
      next: (result) => 
        {
          if(!result.isSucess){
            this.messageService.showMessage('error', result.error);
          }
          else{
            console.log(result);
            this.messageService.showMessage('success', 'Complaint added successfully');
          }
        },
        error: (e) => {
          this.messageService.showMessage('error', e.message);
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
