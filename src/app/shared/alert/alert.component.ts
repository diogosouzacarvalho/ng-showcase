import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  subscription: Subscription | undefined;

  message = 'Testing error message';

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.alertService.alertMessage.subscribe(
      (msg) => {
        this.message = msg;
      }
    );
  }

  onClose(): void {
    this.alertService.onDismiss();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
