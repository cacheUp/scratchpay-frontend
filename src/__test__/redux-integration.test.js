import { storeFactory } from "./storeFactory";
import { actionTypes } from "../actions";

describe("useReducer dispatcher", () => {
  let initialState = {
    userReducer: { error: "", tableError: false, userFormErr: "" }
  };
  describe("When user logs in", () => {
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
    test("logged in user object should populate", () => {
      store.dispatch({ type: actionTypes.SET_USER, payload: loggedInUser });

      const newState = store.getState();
      console.log(newState);
      const expectedState = {
        userReducer: { ...initialState.userReducer, loggedInUser: loggedInUser }
      };
      console.log(expectedState);
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
