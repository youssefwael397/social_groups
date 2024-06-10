// src/components/PostEdit.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { PostData } from '../database/Post';

interface PostEditProps {
  post: PostData;
  onSubmit: (updatedContent: string) => void;
}

const PostEdit: React.FC<PostEditProps> = ({ post, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { content: string }) => {
    onSubmit(values.content);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ content: post.content }}
      onFinish={onFinish}
    >
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
