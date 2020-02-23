import { storeFactory } from "./storeFactory";
import { actionTypes, setErr, setTableErr } from "../actions";

describe("useReducer dispatcher", () => {
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
    //     test("updates state correctly for successful guess", () => {
    //       store.dispatch(guessWord(secretWord));
    //       const newState = store.getState();
    //       const expectedState = {
    //         secretWord,
    //         success: true,
    //         guessedWords: [
    //           {
    //             guessedWord: secretWord,
    //             letterMatchCount: 5
    //           }
    //         ]
    //       };
    //       expect(newState).toEqual(expectedState);
    //     });
    //   });
    //   describe("some guessed words", () => {
    //     const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    //     const initialState = { guessedWords, secretWord };
    //     let store;
    //     beforeEach(() => {
    //       store = storeFactory(initialState);
    //     });
    //     test("updates state correctly for unsuccessful guess", () => {
    //       store.dispatch(guessWord(unsuccessfulGuess));
    //       const newState = store.getState();
    //       const expectedState = {
    //         secretWord,
    //         success: false,
    //         guessedWords: [
    //           ...guessedWords,
    //           { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }
    //         ]
    //       };
    //       expect(newState).toEqual(expectedState);
    //     });
    //     test("updates state correctly for successful guess", () => {
    //       store.dispatch(guessWord(secretWord));
    //       const newState = store.getState();
    //       const expectedState = {
    //         secretWord,
    //         success: true,
    //         guessedWords: [
    //           ...guessedWords,
    //           { guessedWord: secretWord, letterMatchCount: 5 }
    //         ]
    //       };
    //       expect(newState).toEqual(expectedState);
    //     });
  });
});
