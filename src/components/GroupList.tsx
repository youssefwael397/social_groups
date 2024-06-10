import React from 'react';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { GroupData } from '../database/Group.ts';
import { truncateDescription } from '../utils/truncate.ts';

interface GroupListProps {
  groups: GroupData[];
  onEdit: (group: GroupData) => void;
  onDelete: (groupId: string) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: GroupData) => (
        <Link to={`/group/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string) => truncateDescription(text),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: GroupData) => (
        <span>
          <Button
            key="edit"
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button key="delete" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={groups}
      pagination={{ pageSize: 5 }} // Set the page size to display 5 rows per page
    />
  );
};

export default GroupList;
