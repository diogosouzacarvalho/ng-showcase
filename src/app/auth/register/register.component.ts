import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.register({ email, password }).subscribe(
      res => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      (errorMessage: string) => {
        console.log(errorMessage);
        // TODO: Error Alert
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
