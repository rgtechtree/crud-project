import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {
    path: 'userlist', component: UserListComponent
  },
  {
    path: 'createuser', component: CreateUserComponent
  },
  {
    path: '', redirectTo: '/userlist', pathMatch:'full'
  },
  {
    path: 'createuser/edit/:id', component: CreateUserComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
