import { Routes } from '@angular/router';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';

export const routes: Routes = [
  {
    path: 'step1', // ✅ Correct (No `/`)
    component: Step1Component
  },
  {
    path: 'step2', // ✅ Correct (No `/`)
    component: Step2Component
  },
  {
    path: 'step3', // ✅ Correct (No `/`)
    component: Step3Component
  },
  {
    path: '**', // ✅ Redirect unknown paths to Step 1
    redirectTo: 'step1',
    pathMatch: 'full'
  }
];
