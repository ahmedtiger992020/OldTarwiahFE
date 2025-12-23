// modal.service.ts
import { Injectable } from '@angular/core';

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      // Use Bootstrap's jQuery-based modal method to show the modal
      // Make sure '$' is available globally (via window.$ or importing jQuery)
      $(modalElement).modal('show');
    }
  }

  closeModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      // Use Bootstrap's jQuery-based modal method to hide the modal
      $(modalElement).modal('hide');
    }
  }
}
