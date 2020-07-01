import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserPageComponent} from '../../components/user-page/user-page.component';
import {PostComponent} from '../../components/post/post.component';

const routes: Routes = [
  {path: '', component: UserPageComponent},
  {path: 'new', component: PostComponent},
  {path: '**', redirectTo: ''}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }
