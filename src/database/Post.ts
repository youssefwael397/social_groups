// src/database/Post.ts
import { v4 as uuidv4 } from 'uuid';

export interface PostData {
  id: string;
  content: string;
  createdAt: Date;
}

export class Post {
  id: string;
  content: string;
  createdAt: Date;

  constructor(content: string) {
    this.id = uuidv4();
    this.content = content;
    this.createdAt = new Date();
  }
}
