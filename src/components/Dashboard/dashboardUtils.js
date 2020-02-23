import React from "react";
//prettier-ignore
import { Table, Icon, Input, Dropdown } from "semantic-ui-react";

// status array used for the dropdown
const statusArray = [
  { key: "active", text: "active", value: "active" },
  { key: "inActive", text: "inActive", value: "inactive" }
];

// roles array used for the dropdown
const roleArray = [
  { key: "doctor", text: "doctor", value: "doctor" },
  { key: "accountant", text: "accountant", value: "accountant" },
  { key: "admin", text: "admin", value: "admin" }
];

/**
 * @function optionsGenerator
 * @param {String} flag - a condition to determine which array to render
 */

export const optionsGenerator = flag => {
  return flag === "s" ? statusArray : roleArray;
};

/**
 * @function refCheck - used to check which ref should focus based on state
 * @param {Object} state - selected state to determine if the reference is true, if it's true it will focus
 * @param {Ref} firstNameRef - first name ref pointing to first name input
 * @param {Ref} lastNameRef - last name ref pointing to last name input
 * @param {Ref} emailRef - email ref pointing to email input
 */

export const refCheck = (state, firstNameRef, lastNameRef, emailRef) => {
  if (state.firstName) {
    firstNameRef.current.focus();
  } else if (state.lastName) {
    lastNameRef.current.focus();
  } else if (state.email) {
    emailRef.current.focus();
  }
};

/**
 * @function renderCell - conditionally renders Input or Dropdown
 * @param {Object} state - state boolean passed to identify what should be rendered
 * @param {Ref} ref - ref passed down used to have access to a particular element
 * @param {Function} setter - setter function used to select the "select" state
 * @param {Object} onBlurSetterObj - Obj used to set the Inputs onBlur
 * @param {Object} onClickSetterObj - Obj used to pass to the onClick
 * @param {Object value} renderDiv - Text that should be rendered in the table
 * @param {String} name - Name that should be put inside the Input or Dropdown
 * @param {Object value} value - Value that should be inside the Input or Dropdown
 * @param {Function} handleChange - function that is passed down to onChange event
 * @param {Function} onKeydown - a function that returns a function to be passed to onKeyDown event
 * @param {Boolean} dropdown - A boolean flag to conditionally render Input or Dropdown
 * @param {String} options - options letter string to be passed in a function to determine what options array should be used
 * @param {Function} setInput - a setter to set the input state
 * @param {Object} input - input state
 * @param {Function} update - a function that is used to update the user
 */

export const renderCell = (
  state,
  ref,
  setter,
  onBlurSetterObj,
  onClickSetterObj,
  renderDiv,
  name,
  value,
  handleChange,
  onKeydown,
  dropdown = false,
  options = null,
  setInput,
  input,
  update
) => {
  return (
    <Table.Cell collapsing={state}>
      {state ? (
        dropdown === false ? (
          <Input
            ref={ref}
            type="text"
            name={name}
            value={value}
            onKeyDown={onKeydown}
            onChange={event => handleChange(event)}
            onBlur={() => {
              setter(onBlurSetterObj);
            }}
          />
        ) : (
          <>
            <Dropdown
              ref={ref}
              button
              basic
              floating
              name={name}
              onChange={(e, { name, value }) => {
                setInput({ ...input, [name]: value });
              }}
              value={value}
              options={optionsGenerator(options)}
            />
            <Icon
              name="save"
              color="green"
              size="large"
              onClick={update}
              style={{ cursor: "pointer" }}
            />
            <Icon
              name="cancel"
              color="red"
              size="large"
              style={{ cursor: "pointer" }}
              onClick={() => setter(onBlurSetterObj)}
            />
          </>
        )
      ) : (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setter(onClickSetterObj);
          }}
        >
          {renderDiv}
        </div>
      )}
    </Table.Cell>

    //
  );
};
