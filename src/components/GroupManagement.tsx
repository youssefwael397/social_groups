import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import GroupForm from './GroupForm';
import GroupEdit from './GroupEdit';
import GroupList from './GroupList';
import { GroupData, Group } from '../database/Group';
import Lottie from 'react-lottie-player';
import emptyAnimation from '../assets/no-data.json';

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

  // Function to handle modal close and reset state
  const handleCloseModal = () => {
    setVisible(false);
    setEditGroup(null);
  };

  return (
    <div className="my-3">
      <Button
        className="bg_main fs-6 py-3 px-4 d-flex justify-content-center mx-auto"
        type="primary"
        onClick={() => {
          setEditGroup(null);
          setVisible(true);
        }}
      >
        Create Group
      </Button>
      <Modal
        open={visible}
        title={editGroup ? 'Edit Group' : 'Create Group'}
        onCancel={handleCloseModal}
        footer={null}
      >
        {editGroup ? (
          <GroupEdit group={editGroup} onSubmit={handleUpdate} />
        ) : (
          <GroupForm onSubmit={handleCreate} />
        )}
      </Modal>
      {groups.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <Lottie
            loop
            animationData={emptyAnimation}
            play
            style={{ width: 300, height: 300 }}
          />
        </div>
      ) : (
        <GroupList
          groups={groups}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default GroupManagement;
