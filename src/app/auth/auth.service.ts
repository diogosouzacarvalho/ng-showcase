import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from '../shared/alert.service';

import { AuthRequest, AuthResponse, User } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZMHnTc0Xu8yG5jW4jtvBkLBVVtJBEm88';
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZMHnTc0Xu8yG5jW4jtvBkLBVVtJBEm88';

  user = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
  ) { }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already registered. Please use another.';
        break;
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Email and password does not match.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'Contact the administration';
        break;
    }

    this.alertService.setMessage(errorMessage);

    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));

    this.autoLogout(expiresIn * 1000);
  }

  login({ email, password }: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.loginUrl, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      catchError(err => this.handleError(err)),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)),
    )
  }
  
  register({ email, password }: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.registerUrl, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(
      catchError(err => this.handleError(err)),
      tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)),
    );
  }

  autoLogin() {
    const userDatastr = localStorage.getItem('userData');
    let userData : {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } | null = null;

    if (userDatastr) {
      userData = JSON.parse(userDatastr);
    }

    if (!userData) return;

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.user.next(loadedUser);
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
