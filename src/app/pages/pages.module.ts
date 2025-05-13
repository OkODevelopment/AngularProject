import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AllPostsComponent } from './all-posts/all-posts.component';

@NgModule({
  declarations: [
    HomeComponent,
    UserDetailComponent,
    PostDetailComponent,
    AllPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    UserDetailComponent,
    PostDetailComponent,
    AllPostsComponent
  ]
})
export class PagesModule { }
