import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastComponent } from './toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showToast(message: string, title: string) {
    this.toastr.info(message, title, {
      toastComponent: ToastComponent,
      positionClass: 'toast-top-center',
    });
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title);
  }
}
