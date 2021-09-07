import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  subscription: Subscription | undefined;

  hasAlert = false;

  constructor(
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.alertService.alertMessage.subscribe(
      (msg) => {
        this.hasAlert = !!msg;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
