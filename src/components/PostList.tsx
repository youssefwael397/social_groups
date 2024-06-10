// src/components/PostList.tsx
import React from 'react';
import { List, Button } from 'antd';
import { PostData } from '../database/Post';

interface PostListProps {
  posts: PostData[];
  onEdit: (post: PostData) => void;
  onDelete: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(post) => (
        <List.Item
          actions={[
            <Button key="edit" onClick={() => onEdit(post)}>
              Edit
            </Button>,
            <Button key="delete" onClick={() => onDelete(post.id)} danger>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={post.content}
            description={`Created at: ${new Date(
              post.createdAt
            ).toLocaleString()}`}
          />
        </List.Item>
      )}
    />
  );
};

export default PostList;
