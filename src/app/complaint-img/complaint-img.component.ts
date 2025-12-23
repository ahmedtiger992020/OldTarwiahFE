import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../services/complaint.service';
import { MassageService } from '../services/massage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-complaint-img',
  templateUrl: './complaint-img.component.html',
  styleUrl: './complaint-img.component.css'
})
export class ComplaintImgComponent implements OnInit  {
  /**
   *
   */
  loading = true;
  images:any;
  constructor(private complaintService: ComplaintService,
              private messageService: MassageService,
     private sanitizer: DomSanitizer,
     private route: ActivatedRoute
  ) {
    
    
  }
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 0,
    dots: true,
    infinite: true
  };
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
     
 
    this.complaintService.getImges(id).subscribe({
      next: (result) => {
        this.images=result.data;
      },
      error: (e) => {
          this.messageService.showMessage('error', e.message);
          this.loading = false;
      },
      complete: () => {
          this.loading = false;
      }
  });
});
}
  IsImge(data:string)
  {
   
     if(data.includes("image")){
  return true;
    }
  return false;
  }
  ispdf(data:string)
  {
  return data.includes("pdf");
  }
  isvedio(data:string)
  {
  return data.includes("video");
  }
  
getImageUrl(imageUrl: string): string {
  return imageUrl ? imageUrl : '';
}
loadPdf(base64: string) {
   

  const dataUrl =base64; //`data:application/pdf;base64,${base64PdfSample}`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(dataUrl);
}
imgeshow = false;
viewImge:any;
openImageInPopup(imageUrl: string): void {
  // this.bootstrapModalService.openModal('KedanacomplaintImageModal');
  this.imgeshow = true;
  this.viewImge = this.getImageUrl(imageUrl);
}
closeimgmodal()
{
  this.imgeshow = false;

}
prevSlide() {
  const carousel = document.querySelector('#mediaCarousel') as any;
  if (carousel) {
    (window as any).bootstrap.Carousel.getOrCreateInstance(carousel).prev();
  }
}

nextSlide() {
  const carousel = document.querySelector('#mediaCarousel') as any;
  if (carousel) {
    (window as any).bootstrap.Carousel.getOrCreateInstance(carousel).next();
  }
}
}
