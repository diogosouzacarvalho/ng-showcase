import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertMessage = new BehaviorSubject<string>('');

  constructor() { }

  setMessage(message: string): void {
    this.alertMessage.next(message);
  }

  onDismiss(): void {
    this.alertMessage.next('');
  }
}
