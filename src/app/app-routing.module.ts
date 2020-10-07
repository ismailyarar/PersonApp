import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPersonComponent } from './add-person/add-person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { UpdatePersonComponent } from './update-person/update-person.component';

const routes: Routes = [
  { path: '', redirectTo: '/person-add', pathMatch: 'full' },
  { path: 'person-add', component: AddPersonComponent },
  { path: 'person-view', component: PersonListComponent },
  { path: 'update-person/:id', component: UpdatePersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
