import React, { useState, useEffect } from "react";
//prettier-ignore
import { Button, Modal, Form, Message, Segment } from "semantic-ui-react";
import axios from "axios";
import { connect } from "react-redux";
import { setUserFormErr, addUser } from "../../actions";
//inital state for controlled form
const initalState = {
  firstName: "",
  lastName: "",
  email: "",
  status: "",
  role: ""
};
/**
 * @function UserFormModal - Functional Component that renders a modal to submit new user
 * @param {Object} props - inherited object of information needed for component to function
 */
function UserFormModal(props) {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState(initalState);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * @function useEffect - lifecylce method used to disable button if any empty input fields
   */
  useEffect(() => {
    const isUser = Object.values(input).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [input]);

  /**
   * @function useEffect - lifecylce method used to mount errors
   */
  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  /**
   *
   * @param {Object} event - used to prevent default behavior of button
   */
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      props.setUserFormErr("");
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}/api/v1/user`;
      await axios.post(url, input);
      //redux action to add user to allUsers array
      props.addUser(input);
      setLoading(false);
      setModal(false);
      // set input back to empty
      setInput(initalState);
    } catch (error) {
      setLoading(false);
      props.setUserFormErr(error);
    }
  };

  /**
   * @function handleChange
   * @param {Object} event - used for controlled form
   */
  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Button
        icon="add user"
        color="green"
        content="Add User"
        onClick={() => setModal(true)}
      />

      <Modal open={modal} onClose={() => setModal(false)}>
        {props.error && <Message error header="Oops!" content={error} />}
        <Modal.Header>Add a User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Segment>
              <Form.Input
                fluid
                icon="envelope"
                iconPosition="left"
                type="email"
                label="Email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={input.email}
              />
              <Form.Input
                fluid
                icon="user circle"
                iconPosition="left"
                type="text"
                label="First Name"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={input.firstName}
              />
              <Form.Input
                fluid
                icon="user circle outline"
                iconPosition="left"
                type="text"
                label="Last Name"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                value={input.lastName}
              />
              <Form.Select
                fluid
                type="text"
                label="Status"
                placeholder="Please select a status"
                name="status"
                options={[
                  { key: "active", text: "active", value: "active" },
                  { key: "inActive", text: "inActive", value: "inactive" }
                ]}
                onChange={(e, { value }) =>
                  setInput({ ...input, status: value })
                }
                value={input.status}
              />

              <Form.Select
                fluid
                type="text"
                label="Role"
                placeholder="Please select a role"
                name="role"
                options={[
                  { key: "doctor", text: "doctor", value: "doctor" },
                  {
                    key: "accountant",
                    text: "accountant",
                    value: "accountant"
                  },
                  { key: "admin", text: "admin", value: "admin" }
                ]}
                onChange={(e, { value }) => setInput({ ...input, role: value })}
                value={input.role}
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Cancel"
            onClick={() => {
              setModal(false);
              setInput(initalState);
              props.setUserFormErr("");
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={disabled || loading}
            icon="add"
            color="green"
            labelPosition="right"
            content="Save User"
            type="submit"
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

const stateToProps = state => ({
  error: state.userReducer.userFormErr
});

export default connect(stateToProps, { setUserFormErr, addUser })(
  UserFormModal
);
