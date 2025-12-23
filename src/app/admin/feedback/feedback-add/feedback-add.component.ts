import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { MassageService } from '../../../services/massage.service';

@Component({
  selector: 'app-feedback-add',
  templateUrl: './feedback-add.component.html',
  styleUrl: './feedback-add.component.css'
})
export class FeedbackAddComponent implements OnInit {
  addForm: any;
  startDate: any = new Date;
  endDate: any = new Date;

  constructor(private feedbackService: FeedbackService, 
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
    this.feedbackService.addFeedback(model).subscribe({
      next: (result) => 
        {
          if(!result.isSucess){
            this.messageService.showMessage('error', result.error);
          }
          else{
            console.log(result);
            this.messageService.showMessage('success', 'Season added successfully');
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
