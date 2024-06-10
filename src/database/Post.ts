// src/database/Post.ts
import { v4 as uuidv4 } from 'uuid';

export interface PostData {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export class Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;

  constructor(title: string, content: string) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
  }
}
