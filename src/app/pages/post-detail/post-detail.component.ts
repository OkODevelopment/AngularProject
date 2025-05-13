import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PostService } from '../../core/services/post.service';
import { UserService } from '../../core/services/user.service';
import { CommentService } from '../../core/services/comment.service';
import { Post } from '../../core/models/post.model';
import { User } from '../../core/models/user.model';
import { Comment } from '../../core/models/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  author: User | null = null;
  comments: Comment[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.postService.getPost(postId).subscribe({
        next: (post) => {
          this.post = post;
          forkJoin({
            author: this.userService.getUser(post.userId),
            comments: this.commentService.getCommentsByPostId(postId)
          }).subscribe({
            next: (data) => {
              this.author = data.author;
              this.comments = data.comments;
              this.loading = false;
            },
            error: (error) => {
              this.error = 'Erreur lors du chargement des données';
              this.loading = false;
            }
          });
        },
        error: (error) => {
          this.error = 'Erreur lors du chargement du post';
          this.loading = false;
        }
      });
    }
  }

  goToUser(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}
