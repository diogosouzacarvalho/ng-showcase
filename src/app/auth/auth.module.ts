import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
