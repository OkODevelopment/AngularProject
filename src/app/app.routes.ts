import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  {
    path: 'post/:id',
    loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
  {
    path: 'posts',
    loadComponent: () => import('./pages/all-posts/all-posts.component').then(m => m.AllPostsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
