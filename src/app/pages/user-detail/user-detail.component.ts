import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from '../../core/services/user.service';
import { PostService } from '../../core/services/post.service';
import { User } from '../../core/models/user.model';
import { Post } from '../../core/models/post.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      forkJoin({
        user: this.userService.getUser(userId),
        posts: this.postService.getPostsByUserId(userId)
      }).subscribe({
        next: (data) => {
          this.user = data.user;
          this.posts = data.posts;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement des données';
          this.loading = false;
        }
      });
    }
  }

  goToPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
