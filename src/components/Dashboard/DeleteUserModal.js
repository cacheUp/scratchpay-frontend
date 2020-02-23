import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { deleteUser, getAllUsers } from "../../actions";

/**
 * @function DeleteUserModal - Functional Component that renders a modal to confirm a deleting of a user
 * @param {Object} props - inherited object of information needed for component to function
 */

function DeleteUserModal(props) {
  //State for Modal
  const [modal, setModal] = useState(false);
  // User Id from props
  const { id } = props;

  /**
   * @function handleDelete - async function to delete user in the database
   */
  const handleDelete = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/user/${id}`;
    await axios.delete(url);
    props.getAllUsers();
    setModal(false);
  };

  return (
    <>
      <Button
        icon="trash alternate outline"
        color="red"
        content="Delete User"
        onClick={() => setModal(true)}
      />

      <Modal open={modal} dimmer="blurring">
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Content>
          <p> Are you sure you want to delete this user?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" onClick={() => setModal(false)} />
          <Button
            negative
            icon="trash"
            labelPosition="right"
            content="Delete"
            onClick={handleDelete}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default connect(null, { deleteUser, getAllUsers })(DeleteUserModal);
