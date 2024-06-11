import React, { useEffect } from 'react';
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

  // Set initial values when component is mounted
  useEffect(() => {
    form.setFieldsValue(post);
  }, [post, form]);

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
        <Input className="text_color" />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please enter post content' }]}
      >
        <Input.TextArea className="text_color" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg_main py-3 px-4 fs-6 d-flex justify-content-center mx-auto"
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostEdit;
