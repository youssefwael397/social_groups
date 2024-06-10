// src/components/PostForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';

interface PostFormProps {
  onSubmit: (content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { content: string }) => {
    onSubmit(values.content);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Please enter post content' }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
