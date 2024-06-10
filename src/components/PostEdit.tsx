import React from 'react';
import { Form, Input, Button } from 'antd';
import { PostData } from '../database/Post';

interface PostEditProps {
  post: PostData;
  onSubmit: (updatedTitle: string, updatedContent: string) => void;
}

const PostEdit: React.FC<PostEditProps> = ({ post, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { title: string; content: string }) => {
    onSubmit(values.title, values.content);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ title: post.title, content: post.content }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter post title' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please enter post content' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostEdit;
