import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import GroupForm from './GroupForm.tsx';
import GroupEdit from './GroupEdit.tsx';
import GroupList from './GroupList.tsx';
import { GroupData, Group } from '../database/Group.ts';

const GroupManagement: React.FC = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [editGroup, setEditGroup] = useState<GroupData | null>(null);

  // Fetch all groups from localStorage on component mount
  React.useEffect(() => {
    const storedGroups = Group.getAllGroups();
    setGroups(storedGroups);
  }, []);

  // Function to handle group creation
  const handleCreate = (values: GroupData) => {
    const newGroup = new Group(values.name, values.description);
    newGroup.saveToLocalStorage();
    setGroups([...groups, newGroup]);
    setVisible(false);
  };

  // Function to handle group edit
  const handleEdit = (group: GroupData) => {
    setEditGroup(group);
    setVisible(true);
  };

  // Function to handle group update
  const handleUpdate = (values: Partial<GroupData>) => {
    if (editGroup) {
      const updatedGroup = { ...editGroup, ...values };
      const isSuccess = Group.updateGroupById(updatedGroup.id, updatedGroup);
      if (isSuccess) {
        setGroups(
          groups.map((group) =>
            group.id === updatedGroup.id ? updatedGroup : group
          )
        );
        setVisible(false);
        setEditGroup(null);
      }
    }
  };

  // Function to handle group deletion
  const handleDelete = (groupId: string) => {
    Group.deleteGroupById(groupId);
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  return (
    <div>
      <Button className='mb-2' type="primary" onClick={() => setVisible(true)}>
        Create Group
      </Button>
      <Modal
        visible={visible}
        title={editGroup ? 'Edit Group' : 'Create Group'}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {editGroup ? (
          <GroupEdit group={editGroup} onSubmit={handleUpdate} />
        ) : (
          <GroupForm onSubmit={handleCreate} />
        )}
      </Modal>
      <GroupList groups={groups} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );      
};

export default GroupManagement;
