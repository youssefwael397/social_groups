import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GroupData, Group } from '../database/Group';
import PostList from './PostList';
import PostForm from './PostForm';
import PostEdit from './PostEdit';
import { PostData } from '../database/Post';
import { Modal, Button } from 'antd';

const GroupDetail: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [group, setGroup] = useState<GroupData | undefined>(
    Group.findGroupById(groupId || '')
  );
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const [postModalVisible, setPostModalVisible] = useState(false);

  if (!group) {
    return <div>Group not found!</div>;
  }

  const handleAddPost = (title: string, content: string) => {
    const groupInstance = new Group(group.name, group.description);
    groupInstance.id = group.id;
    groupInstance.createdAt = group.createdAt;
    groupInstance.posts = group.posts;

    groupInstance.addPost(title, content);
    setGroup(Group.findGroupById(group.id));
  };

  const handleEditPost = (updatedTitle: string, updatedContent: string) => {
    if (editingPost) {
      const groupInstance = new Group(group.name, group.description);
      groupInstance.id = group.id;
      groupInstance.createdAt = group.createdAt;
      groupInstance.posts = group.posts;

      groupInstance.updatePost(editingPost.id, {
        title: updatedTitle,
        content: updatedContent,
      });
      setGroup(Group.findGroupById(group.id));
      setEditingPost(null);
      setPostModalVisible(false);
    }
  };

  const handleDeletePost = (postId: string) => {
    const groupInstance = new Group(group.name, group.description);
    groupInstance.id = group.id;
    groupInstance.createdAt = group.createdAt;
    groupInstance.posts = group.posts;

    groupInstance.deletePost(postId);
    setGroup(Group.findGroupById(group.id));
  };

  return (
    <div>
      <h2 className="text-primary">{group.name}</h2>
      <p>{group.description}</p>

      <Button type="primary" onClick={() => setPostModalVisible(true)}>
        Add Post
      </Button>

      <PostList
        posts={group.posts}
        onEdit={setEditingPost}
        onDelete={handleDeletePost}
      />

      <Modal
        visible={postModalVisible || !!editingPost}
        title={editingPost ? 'Edit Post' : 'Add Post'}
        onCancel={() => {
          setPostModalVisible(false);
          setEditingPost(null);
        }}
        footer={null}
      >
        {editingPost ? (
          <PostEdit post={editingPost} onSubmit={handleEditPost} />
        ) : (
          <PostForm onSubmit={handleAddPost} />
        )}
      </Modal>
    </div>
  );
};

export default GroupDetail;
