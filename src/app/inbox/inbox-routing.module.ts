import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: ':emailId', component: EmailShowComponent },
      { path: '', component: PlaceholderComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxRoutingModule {}