export interface BlogPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}
