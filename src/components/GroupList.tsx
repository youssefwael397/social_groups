import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { GroupData } from '../database/Group';
import { truncateDescription } from '../utils/truncate';
import '../styles/groups.css';

interface GroupListProps {
  groups: GroupData[];
  onEdit: (group: GroupData) => void;
  onDelete: (groupId: string) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onEdit, onDelete }) => {
  return (
    <div className='row mt-4'>
      {groups.map(group => (
        <div className='col-lg-6 col-md-12 col-sm-12' key={group.id}>
          <div className="card group border-0 mb-4" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-6">
                <img src="../images/group2.jpg" className="w-100 h-100 rounded-start" alt={group.name} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <div className='d-flex align-items-center'>
                    <CalendarOutlined className='main_color' />
                    <p className='mb-0 ms-2 text_color'>{new Date(group.createdAt).toLocaleString()}</p>
                  </div>
                  <h5 className="card-title mt-2"><Link to={`/group/${group.id}`} className='text-dark'>{group.name}</Link></h5>
                  <p className="card-text text_color">{truncateDescription(group.description)}</p>
                  <div className="card-text d-flex align-items-center">
                    <div
                      className='bg_main text-light p-2 px-3 rounded-circle'
                      onClick={() => onEdit(group)}
                      style={{ cursor: 'pointer' }}
                    >
                      <EditOutlined />
                    </div>
                    <div
                      className='bg_main text-light p-2 px-3 rounded-circle ms-4'
                      onClick={() => onDelete(group.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <DeleteOutlined />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupList;

