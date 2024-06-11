import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

interface PostFormProps {
  onSubmit: (title: string, content: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: { title: string; content: string }) => {
    onSubmit(values.title, values.content);
    form.resetFields();
  };

  // Clear form fields when component is mounted
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
