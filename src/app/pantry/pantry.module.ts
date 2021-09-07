import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PantryRoutingModule } from './pantry-routing.module';

import { PantryComponent } from './pantry/pantry.component';

@NgModule({
  declarations: [
    PantryComponent,
  ],
  imports: [
    SharedModule,
    PantryRoutingModule,
  ]
})
export class PantryModule { }
