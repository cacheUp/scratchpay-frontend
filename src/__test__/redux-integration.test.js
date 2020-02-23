import { storeFactory } from "./storeFactory";
import { actionTypes, setErr, setTableErr } from "../actions";
import { act } from "@testing-library/react";

describe("user reducer dispatcher", () => {
  let initialState = {
    userReducer: { error: "", tableError: false, userFormErr: "" }
  };
  describe("when dispatching actions", () => {
    let store;
    let loggedInUser = {
      id: 1,
      role: "auth",
      firstName: "Bradley",
      lastName: "Ball",
      status: "active"
    };

    let allUsers = [
      {
        id: 1,
        role: "auth",
        firstName: "Bradley",
        lastName: "Ball",
        status: "active"
      },
      {
        id: 2,
        role: "auth",
        firstName: "Brady",
        lastName: "Hall",
        status: "active"
      },
      {
        id: 3,
        role: "auth",
        firstName: "Katie",
        lastName: "Mall",
        status: "active"
      }
    ];

    beforeEach(() => {
      store = storeFactory(initialState);
    });
    test("setUser should set the user that is passed", () => {
      store.dispatch({ type: actionTypes.SET_USER, payload: loggedInUser });

      const newState = store.getState();
      const expectedState = {
        userReducer: { ...initialState.userReducer, loggedInUser: loggedInUser }
      };
      expect(newState).toEqual(expectedState);
    });

    test("setError should set the error state", () => {
      store.dispatch(setErr("error dispatched"));

      const newState = store.getState();
      const expectedState = {
        userReducer: { ...initialState.userReducer, error: "error dispatched" }
      };
      expect(newState).toEqual(expectedState);
    });

    test("Table Error should set the table error state", () => {
      store.dispatch(setTableErr({ message: "error dispatched" }));

      const newState = store.getState();
      const expectedState = {
        userReducer: {
          ...initialState.userReducer,
          tableError: "error dispatched"
        }
      };
      expect(newState).toEqual(expectedState);
    });

    test("set all users should set the allUsers state array", () => {
      store.dispatch({ type: actionTypes.SET_ALL_USERS, payload: allUsers });

      const newState = store.getState();
      const expectedState = {
        userReducer: {
          ...initialState.userReducer,
          allUsers: allUsers
        }
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
