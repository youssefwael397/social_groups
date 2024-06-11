import React from 'react';
import { List, Button } from 'antd';
import { PostData } from '../database/Post';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface PostListProps {
  posts: PostData[];
  onEdit: (post: PostData) => void;
  onDelete: (postId: string) => void;
}

const PostList: React.FC<PostListProps> = ({ posts, onEdit, onDelete }) => {
  return (
    <List className='group rounded-3 my-4 py-2 px-4'
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(post) => (
        <List.Item
          actions={[
            <Button key="edit" onClick={() => onEdit(post)}>
              <EditOutlined />
            </Button>,
            <Button key="delete" onClick={() => onDelete(post.id)} danger>
              <DeleteOutlined />
            </Button>,
          ]}
        >

          <List.Item.Meta
            title={<p className='fs-5 main_color mb-0'>{post.title}</p>}
            description={
              <div>
                <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
                <p className='text-dark fs-6'>{post.content}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default PostList;
