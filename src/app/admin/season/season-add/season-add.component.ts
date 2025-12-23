import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeasonService } from '../../../services/season.service';
import { AuthService } from '../../../services/auth.service';
import { MassageService } from '../../../services/massage.service';

declare var $: any;

@Component({
  selector: 'app-season-add',
  templateUrl: './season-add.component.html',
  styleUrl: './season-add.component.css'
})
export class SeasonAddComponent implements OnInit, AfterViewInit {
  addSeasonForm: any;
  startDate: any = new Date;
  endDate: any = new Date;

  constructor(private seasonService: SeasonService, 
              private authService: AuthService,
              private router: Router,
              private messageService: MassageService) {

  }

  ngOnInit(): void {
    this.intiateform();
  }
  
  ngAfterViewInit(): void {
    //$('#datetimepicker').datetimepicker();
  }
  
  intiateform() {
    this.addSeasonForm = new FormGroup({
      // Define your form controls here
       id: new FormControl(0, Validators.required),
       code: new FormControl('', Validators.required),
       nameEn: new FormControl('', Validators.required),
       nameAr: new FormControl('', Validators.required),
       startDate: new FormControl(this.startDate, Validators.required),
       endDate: new FormControl(this.endDate, Validators.required),
       isActive: new FormControl(false, [Validators.required])
    });
  }

  submitForm(model: any) {
    if(this.addSeasonForm.valid){
      //let loggedInUser = this.authService.getLoggedInUser();
    this.seasonService.addSeason(model, 0).subscribe({
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
          this.addSeasonForm.reset();
        },
        complete: () => {
          console.info('complete');
          this.addSeasonForm.reset();
        }
    });
  }
  else{
    Object.keys(this.addSeasonForm.controls).forEach(key => {
      this.addSeasonForm.controls[key].markAsDirty();
    });
  }
}
}
