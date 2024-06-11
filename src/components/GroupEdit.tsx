import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { GroupData } from '../database/Group';

interface GroupEditProps {
  group: GroupData;
  onSubmit: (values: Partial<GroupData>) => void;
}

const GroupEdit: React.FC<GroupEditProps> = ({ group, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  // Set initial values when component is mounted
  useEffect(() => {
    form.setFieldsValue(group);
  }, [group, form]);

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
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GroupEdit;
