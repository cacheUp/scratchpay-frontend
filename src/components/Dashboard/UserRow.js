import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import { renderCell, refCheck } from "./dashboardUtils";
import { Table } from "semantic-ui-react";

import DeleteUserModal from "./DeleteUserModal";

/**
 * @function UserRow - Functional Component that renders Table Rows
 * @param {Object} props - inherited object of information needed for component to function
 */

function UserRow(props) {
  //user being passed from map function
  const { user, index } = props;
  //boolean state essential for ref functionality
  const [selected, setSelected] = useState({
    firstName: false,
    lastName: false,
    email: false,
    role: false,
    status: false
  });
  //input used for controlled form
  const [input, setInput] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
    role: user.role
  });
  //refs to give access to input elements
  let firstNameRef = createRef();
  let lastNameRef = createRef();
  let emailRef = createRef();
  let roleRef = createRef();
  let statusRef = createRef();
  //used to focus selected inputs
  useEffect(() => {
    refCheck(selected, firstNameRef, lastNameRef, emailRef, roleRef, statusRef);
  }, [selected]);

  /**
   * @function updateUser - a closure made to update a user in the database
   * @param {Object} user - the update information of a user
   * @param {Number} index - index used to update user in redux store
   * @param {Function} setSelected - used to set the selected states back to false
   */

  const updateUser = (user, index, setSelected) => {
    return async () => {
      props.setError(false);
      try {
        const url = `${process.env.REACT_APP_API_URL}/api/v1/user/${user.id}`;
        await axios.put(url, user);
        props.editUser(user, index);
        setSelected({
          firstName: false,
          lastName: false,
          email: false,
          role: false,
          status: false
        });
      } catch (err) {
        props.setTableErr(err);
      }
    };
  };

  /**
   * @function handleChange
   * @param {Object} event - used to change controlled input
   */
  const handleChange = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  /**
   * @function onKeydown
   * @param {Function} setSelected - used to set select state back to false
   * @param {Function} setInput - used to set input object
   * @param {Object} setInputObj - input Object passed to set input function
   * @param {Function} update - used to update user if they press inter
   * @param {Object} input - current input object
   */
  const onKeydown = (setSelected, setInput, setInputObj, update, input) => {
    return event => {
      if (event.key === "Escape") {
        setSelected(false);
        setInput(setInputObj);
      } else if (event.key === "Enter") {
        setSelected(false);
        update(input, index);
      }
    };
  };

  return (
    <Table.Row>
      {renderCell(
        selected.firstName,
        firstNameRef,
        setSelected,
        { ...selected, firstName: false },
        { ...selected, firstName: true },
        user.firstName,
        "firstName",
        input.firstName,
        handleChange,
        onKeydown(
          setSelected,
          setInput,
          { ...input, firstName: user.firstName },
          updateUser({ ...user, ...input }, index, setSelected),
          input
        )
      )}

      {renderCell(
        selected.lastName,
        lastNameRef,
        setSelected,
        { ...selected, lastName: false },
        { ...selected, lastName: true },
        user.lastName,
        "lastName",
        input.lastName,
        handleChange,
        onKeydown(
          setSelected,
          setInput,
          { ...input, lastName: user.lastName },
          updateUser({ ...user, ...input }, index, setSelected),
          input
        )
      )}

      {renderCell(
        selected.email,
        emailRef,
        setSelected,
        { ...selected, email: false },
        { ...selected, email: true },
        user.email,
        "email",
        input.email,
        handleChange,
        onKeydown(
          setSelected,
          setInput,
          { ...input, email: user.email },
          updateUser({ ...user, ...input }, index, setSelected),
          input
        )
      )}

      {renderCell(
        selected.role,
        roleRef,
        setSelected,
        { ...selected, role: false },
        { ...selected, status: false, role: true },
        user.role,
        "role",
        input.role,
        handleChange,
        onKeydown(
          setSelected,
          setInput,
          { ...input, role: user.role },
          updateUser({ ...user, ...input }, index, setSelected),
          input
        ),
        true,
        "r",
        setInput,
        input,
        updateUser({ ...user, ...input }, index, setSelected)
      )}

      {renderCell(
        selected.status,
        statusRef,
        setSelected,
        { ...selected, status: false },
        { ...selected, role: false, status: true },
        user.status,
        "status",
        input.status,
        handleChange,
        onKeydown(
          setSelected,
          setInput,
          { ...input, status: user.status },
          updateUser({ ...user, ...input }, index, setSelected),
          input
        ),
        true,
        "s",
        setInput,
        input,
        updateUser({ ...user, ...input }, index, setSelected)
      )}
      <Table.Cell collapsing>
        <DeleteUserModal id={user.id} />
      </Table.Cell>
    </Table.Row>
  );
}

export default UserRow;
