import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { GroupData } from '../database/Group';

interface GroupFormProps {
  onSubmit: (values: GroupData) => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  // Clear form fields when component is mounted
  useEffect(() => {
    form.resetFields();
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter group name' }]}
      >
        <Input className="text_color" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter description' }]}
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

export default GroupForm;
