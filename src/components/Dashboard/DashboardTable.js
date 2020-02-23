import React, { useState, useEffect } from "react";
import { Header, Table, Icon, Message } from "semantic-ui-react";
import UserFormModal from "./UserFormModal";
import { connect } from "react-redux";
import { editUser, setTableErr, getAllUsers } from "../../actions";
import UserRow from "./UserRow";

/**
 * @function DashboardTable - Functional Component that renders a user management table
 * @param {Object} props - inherited object of information needed for component to function
 */

function DashboardTable(props) {
  const [error, setError] = useState(props.error);
  const { getAllUsers } = props;

  /**
   * @function useEffect - used to render initial users
   */
  useEffect(() => {
    getAllUsers();
  }, []);

  /**
   * @function useEffect - used to render errors
   */
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <div style={{ margin: "2em 0" }}>
      <Header as="h2">
        <Icon name="settings" />
        Admin Dashboard
      </Header>

      <Header as="h2">
        <UserFormModal />
      </Header>
      {error && <Message error header="Oops!" content={error} />}
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users &&
            props.users.map((user, index) => (
              <UserRow
                setError={setError}
                setTableErr={props.setTableErr}
                key={user.id}
                user={user}
                index={index}
                editUser={props.editUser}
              />
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}

const stateToProps = state => ({
  users: state.userReducer.allUsers,
  error: state.userReducer.tableError
});

export default connect(stateToProps, {
  editUser,
  setTableErr,
  getAllUsers
})(DashboardTable);
