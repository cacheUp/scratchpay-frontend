import axios from "axios";
import jwt from "jsonwebtoken";

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ERROR: "SET_ERROR",
  EDIT_USER: "EDIT_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_TABLE_ERROR: "SET_TABLE_ERROR",
  DELETE_USER: "DELETE_USER",
  SET_USER_FORM_ERR: "SET_USER_FORM_ERR",
  ADD_USER: "ADD_USER"
};

/**
 * @function catchErrors - used to make readable version of an error object
 * @param {Object} error - object that comes back from server if theres an error
 */

function catchErrors(error) {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;
  } else if (error.request) {
    errorMsg = error.request;
  } else {
    errorMsg = error.message;
  }
  return errorMsg;
}

/**
 * @function loginUser - thunk action to login user
 * @param {Object} d - data used to login user
 */

export const loginUser = d => async dispatch => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const url = `${process.env.REACT_APP_API_URL}/api/v1/auth/login`;
    const { data } = await axios.post(url, d);
    localStorage.setItem("token", data.token);
    const user = jwt.decode(data.token);
    dispatch({ type: actionTypes.SET_USER, payload: user.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: actionTypes.SET_ERROR, payload: catchErrors(err) });
  }
};

/**
 * @function setErr - function to set error for login
 * @param {Object} err - err used to set Error
 */

export const setErr = err => ({ type: actionTypes.SET_ERROR, payload: err });

/**
 * @function setTableErr - function to set error for table
 * @param {Object} err - err used to set Error
 */

export const setTableErr = err => ({
  type: actionTypes.SET_TABLE_ERROR,
  payload: catchErrors(err)
});

/**
 * @function setUser - function to set user
 * @param {Object} user - logged in user information
 */

export const setUser = user => ({ type: actionTypes.SET_USER, payload: user });

/**
 * @function editUser - function to edit User in redux store
 * @param {Object} user - updated user object
 * @param {Number} index - index of user to be updated
 */

export const editUser = (user, index) => ({
  type: actionTypes.EDIT_USER,
  payload: { editedUser: user, index }
});

/**
 * @function getAllUsers - thunk to retrieve all users from database
 *
 */

export const getAllUsers = () => async dispatch => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/api/v1/user`;
    const { data } = await axios.get(url);
    dispatch({ type: actionTypes.SET_ALL_USERS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: actionTypes.SET_ERROR, payload: catchErrors(err) });
  }
};

/**
 * @function deleteUser - function to edit User in redux store
 * @param {Number} id - id of user to be deleted
 */

export const deleteUser = id => ({
  type: actionTypes.DELETE_USER,
  payload: id
});

/**
 * @function setUserFormErr - function to set errors in the create user modal form
 * @param {Object} err - error object if request failed from server
 */

export const setUserFormErr = err => ({
  type: actionTypes.SET_USER_FORM_ERR,
  payload: catchErrors(err)
});

/**
 * @function addUser - function to add User in redux store
 * @param {Object} user - user object to be added
 */
export const addUser = user => ({
  type: actionTypes.ADD_USER,
  payload: user
});
