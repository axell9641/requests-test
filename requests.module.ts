import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AdditionalDataItemComponent } from './components/additional-data-item/additional-data-item.component';
import { AttributeListComponent } from './components/attribute-list/attribute-list.component';
import { AttributeComponent } from './components/attribute/atribute.component';
import { CredentialComponent } from './components/credential/credential.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicInputComponent } from './components/dynamic-input/dynamic-input.component';
import { RequestDetailsActionsComponent } from './components/request-details-actions/request-details-actions.component';
import { RequestDetailsAdditionalDataComponent } from './components/request-details-additional-data/request-details-additional-data.component';
import { RequestDetailsContentComponent } from './components/request-details-content/request-details-content.component';
import { RequestDetailsHeaderComponent } from './components/request-details-header/request-details-header.component';
import { StatsItemComponent } from './components/stats-item/stats-item.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RequestDetailsComponent } from './containers/request-details/request-details.component';
import { RequestListComponent } from './containers/request-list/request-list.component';
import { StatsComponent } from './containers/stats/stats.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { RequestsRoutingModule } from './requests-routing.module';

@NgModule({
  declarations: [
    RequestListComponent,
    DashboardComponent,
    StatsComponent,
    StatsItemComponent,
    ShortNumberPipe,
    RequestDetailsComponent,
    RequestDetailsHeaderComponent,
    RequestDetailsContentComponent,
    RequestDetailsActionsComponent,
    RequestDetailsAdditionalDataComponent,
    AttributeListComponent,
    AttributeComponent,
    CredentialComponent,
    DynamicInputComponent,
    DynamicFormComponent,
    AdditionalDataItemComponent,
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class RequestsModule {}
