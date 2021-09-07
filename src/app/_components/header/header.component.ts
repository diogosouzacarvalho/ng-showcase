import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private authSubscription: Subscription | undefined;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
  ) { }
  
  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(
      user => this.isAuthenticated = !!user
    )
  }

  onLogout(): void {
    this.authService.logout();
  }
  
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
