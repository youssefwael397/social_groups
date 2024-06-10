import { v4 as uuidv4 } from 'uuid';
import { Post, PostData } from './Post';

export interface GroupData {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  posts: PostData[];
}

export class Group {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  posts: PostData[];

  constructor(name: string, description: string) {
    this.id = uuidv4(); // Unique identifier using uuid
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
    this.posts = [];
  }

  // Add a post to the group
  addPost(content: string): PostData {
    const post = new Post(content);
    this.posts.push(post);
    this.saveToLocalStorage();
    return post;
  }

  // Update a post in the group
  updatePost(postId: string, updatedPost: Partial<PostData>): boolean {
    const postIndex = this.posts.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      this.posts[postIndex] = { ...this.posts[postIndex], ...updatedPost };
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  // Delete a post from the group
  deletePost(postId: string): boolean {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter((post) => post.id !== postId);
    if (this.posts.length !== initialLength) {
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  // Save group to localStorage
  saveToLocalStorage() {
    const groups: GroupData[] = JSON.parse(
      localStorage.getItem('groups') || '[]'
    );
    const existingGroupIndex = groups.findIndex(
      (group) => group.id === this.id
    );
    if (existingGroupIndex !== -1) {
      groups[existingGroupIndex] = { ...this };
    } else {
      groups.push({ ...this });
    }
    localStorage.setItem('groups', JSON.stringify(groups));
  }

  // Fetch all groups from localStorage
  static getAllGroups(): GroupData[] {
    const storedData = localStorage.getItem('groups');
    return storedData ? JSON.parse(storedData) : [];
  }

  // Find group by ID
  static findGroupById(groupId: string): GroupData | undefined {
    const storedData = localStorage.getItem('groups');
    if (storedData) {
      const groups: GroupData[] = JSON.parse(storedData);
      return groups.find((group) => group.id === groupId);
    }
    return undefined;
  }

  // Update group in localStorage by ID
  static updateGroupById(
    groupId: string,
    updatedGroup: Partial<GroupData>
  ): boolean {
    let storedData = localStorage.getItem('groups');
    if (storedData) {
      let groups: GroupData[] = JSON.parse(storedData);
      const index = groups.findIndex((group) => group.id === groupId);
      if (index !== -1) {
        groups[index] = { ...groups[index], ...updatedGroup };
        localStorage.setItem('groups', JSON.stringify(groups));
        return true;
      }
    }
    return false;
  }

  // Delete group from localStorage by ID
  static deleteGroupById(groupId: string) {
    let storedData = localStorage.getItem('groups');
    if (storedData) {
      let groups: GroupData[] = JSON.parse(storedData);
      const updatedGroups = groups.filter((group) => group.id !== groupId);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
    }
  }
}
