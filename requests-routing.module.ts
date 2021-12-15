import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RequestDetailsComponent } from './containers/request-details/request-details.component';
import { RequestDetailsResolverService } from './services/request-details-resolver.service';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: ':id', component: RequestDetailsComponent, resolve: {
      procedureDetail: RequestDetailsResolverService
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RequestsRoutingModule { }
