import React from 'react';

const AdminButtons = props => {
  return (
    <div className="float-right">
      <i
        className="fas fa-edit"
        onClick={() => props.getEditPage(props.vacation_id)}
      />
      <i
        className="far fa-times-circle"
        onClick={() => props.handleShow(props.vacation_id)}
      />
    </div>
  );
};

export default AdminButtons;
