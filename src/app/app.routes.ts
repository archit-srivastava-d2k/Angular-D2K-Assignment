import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step2Guard } from './model-color.guard';
import { Step3Guard } from './step3.guard';
import { OrderComponent } from './order/order.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
export const routes: Routes = [
  { path: 'step1',title: 'Step 1: Model & Color', component: Step1Component },
  { path: 'step2',title: 'Step 2: Configuration', component: Step2Component, canActivate: [Step2Guard] },
  { path: 'step3',title: 'Step 3: Order Summary', component: Step3Component, canActivate: [Step3Guard],
    children: [
      { path: 'order', component: OrderComponent, title: 'Place Order' }
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export class AppRoutingModule { }
