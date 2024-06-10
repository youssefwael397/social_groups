import React from 'react';
import { Form, Input, Button } from 'antd';
import { GroupData } from '../database/Group.ts';

interface GroupEditProps {
  group: GroupData;
  onSubmit: (values: Partial<GroupData>) => void;
}

const GroupEdit: React.FC<GroupEditProps> = ({ group, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={group}
      onFinish={onFinish}
    >
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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GroupEdit;
