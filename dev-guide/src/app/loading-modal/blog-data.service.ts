import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BlogPostsResponse } from './blog-post.model';

@Injectable({ providedIn: 'root' })
export class BlogDataService {
  private readonly http = inject(HttpClient);
  private readonly postsUrl = 'https://dummyjson.com/posts';

  getPosts(limit = 5): Observable<BlogPostsResponse> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('select', 'id,title,body,tags,reactions');

    return this.http.get<BlogPostsResponse>(this.postsUrl, { params });
  }
}
