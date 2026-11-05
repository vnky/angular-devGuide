import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { BlogDataService } from './blog-data.service';
import { BlogPost } from './blog-post.model';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.html',
  styleUrl: './loading-modal.css',
})
export class LoadingModal {
  private readonly destroyRef = inject(DestroyRef);
  private readonly blogData = inject(BlogDataService);
  private progressTimerId: ReturnType<typeof setInterval> | null = null;
  private loadGeneration = 0;

  protected readonly isOpen = signal(false);
  protected readonly isLoading = signal(false);
  protected readonly progress = signal(0);
  protected readonly statusMessage = signal('');
  protected readonly posts = signal<BlogPost[]>([]);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.destroyRef.onDestroy(() => this.stopProgressAnimation());
  }

  openModal(): void {
    this.isOpen.set(true);
    this.loadPosts();
  }

  closeModal(): void {
    this.stopProgressAnimation();
    this.isOpen.set(false);
  }

  reloadInModal(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    const generation = ++this.loadGeneration;
    this.stopProgressAnimation();
    this.isLoading.set(true);
    this.progress.set(0);
    this.posts.set([]);
    this.error.set(null);
    this.statusMessage.set('Fetching posts from DummyJSON…');
    this.startProgressAnimation();

    this.blogData
      .getPosts(5)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.stopProgressAnimation()),
      )
      .subscribe({
        next: (response) => {
          if (generation !== this.loadGeneration) {
            return;
          }
          this.progress.set(100);
          this.isLoading.set(false);
          this.posts.set(response.posts);
          this.statusMessage.set(`Loaded ${response.posts.length} of ${response.total} posts`);
        },
        error: () => {
          if (generation !== this.loadGeneration) {
            return;
          }
          this.isLoading.set(false);
          this.progress.set(0);
          this.error.set('Could not load posts. Check your connection and try again.');
          this.statusMessage.set('Request failed');
        },
      });
  }

  /** Visual progress while the HTTP request is in flight (caps at 90% until data arrives). */
  private startProgressAnimation(): void {
    this.progressTimerId = setInterval(() => {
      if (!this.isLoading()) {
        return;
      }
      const next = Math.min(this.progress() + Math.floor(Math.random() * 10) + 3, 90);
      this.progress.set(next);
    }, 300);
  }

  private stopProgressAnimation(): void {
    if (this.progressTimerId !== null) {
      clearInterval(this.progressTimerId);
      this.progressTimerId = null;
    }
  }
}
