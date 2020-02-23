import { actionTypes } from "../actions";

/**
 * @function userReducer
 * @param {string} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {string} - New state (secret word payload from action).
 */
export default (
  state = { error: "", tableError: false, userFormErr: "" },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, loggedInUser: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_TABLE_ERROR:
      return { ...state, tableError: action.payload };
    case actionTypes.SET_ALL_USERS:
      return { ...state, allUsers: action.payload };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((item, index) => {
          if (index === action.payload.index) {
            return { ...item, ...action.payload.editedUser };
          } else {
            return item;
          }
        })
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((item, index) => {
          return item.id !== action.payload;
        })
      };

    case actionTypes.SET_USER_FORM_ERR:
      return {
        ...state,
        userFormErr: action.payload
      };

    case actionTypes.ADD_USER:
      return {
        ...state,
        allUsers: [action.payload, ...state.allUsers]
      };

    default:
      console.log(action);
      return state;
  }
};
