import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PostService } from '../../core/services/post.service';
import { UserService } from '../../core/services/user.service';
import { Post } from '../../core/models/post.model';
import { User } from '../../core/models/user.model';

interface PostWithAuthor extends Post {
  author?: User;
  isFavorite?: boolean;
}

@Component({
  selector: 'app-all-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss'
})
export class AllPostsComponent implements OnInit {
  posts: PostWithAuthor[] = [];
  filteredPosts: PostWithAuthor[] = [];
  loading = true;
  error: string | null = null;
  searchTerm = '';

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPostsWithAuthors();
  }

  private loadPostsWithAuthors(): void {
    this.postService.getPosts().subscribe({
      next: (posts) => {
        const uniqueUserIds = [...new Set(posts.map(post => post.userId))];
        
        forkJoin(
          uniqueUserIds.map(id => this.userService.getUser(id))
        ).subscribe({
          next: (users) => {
            this.posts = posts.map(post => ({
              ...post,
              author: users.find(user => user.id === post.userId),
              isFavorite: false
            }));
            this.filteredPosts = this.posts;
            this.loading = false;
          },
          error: (error) => {
            this.error = 'Erreur lors du chargement des auteurs';
            this.loading = false;
          }
        });
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des posts';
        this.loading = false;
      }
    });
  }

  filterPosts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPosts = this.posts;
      return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(searchTermLower) ||
      post.body.toLowerCase().includes(searchTermLower) ||
      post.author?.name.toLowerCase().includes(searchTermLower)
    );
  }

  toggleFavorite(post: PostWithAuthor): void {
    post.isFavorite = !post.isFavorite;
  }

  goToPost(postId: number): void {
    this.router.navigate(['/post', postId]);
  }

  goToUser(userId: number): void {
    this.router.navigate(['/user', userId]);
  }
}
