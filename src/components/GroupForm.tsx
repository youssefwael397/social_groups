import React from 'react';
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

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter group name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter description' }]}
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

export default GroupForm;
