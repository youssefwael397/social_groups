import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GroupData, Group } from '../database/Group';
import PostList from './PostList';
import PostForm from './PostForm';
import PostEdit from './PostEdit';
import { PostData } from '../database/Post';
import { Modal, Button } from 'antd';
import Lottie from 'react-lottie-player';
import emptyAnimation from '../assets/no-data.json';

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
    setPostModalVisible(false); // Close the modal after adding post
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
      setPostModalVisible(false); // Close the modal after editing post
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
    <div className="my-4">
      <h2>Group: {group.name}</h2>
      <p className="text_color">{group.description}</p>

      <Button
        type="primary"
        onClick={() => setPostModalVisible(true)}
        className="bg_main fs-6 py-3 px-4 d-flex justify-content-center mx-auto"
      >
        Add Post
      </Button>

      {group.posts.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <Lottie
            loop
            animationData={emptyAnimation}
            play
            style={{ width: 300, height: 300 }}
          />
        </div>
      ) : (
        <PostList
          posts={group.posts}
          onEdit={(post) => {
            setEditingPost(post);
            setPostModalVisible(true);
          }}
          onDelete={handleDeletePost}
        />
      )}

      <Modal
        open={postModalVisible}
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
