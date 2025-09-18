import anecdoteReducer from "./anecdoteReducer";
import deepFreeze from "deep-freeze";

test("createAnecdote is succesfull", () => {
  const state = [
    {
      constent: "11",
      id: 1,
      votes: 2,
    },
    {
      constent: "22",
      id: 2,
      votes: 4,
    },
  ];

  deepFreeze(state);

  const action = {
    type: "anecdotes/createAnecdote",
    payload: { content: "33", votes: 0 },
  };

  const newState = anecdoteReducer(state, action);

  expect(newState.length).toBe(3);
  expect(newState[2].content).toBe("33");
});

test("updateAnecdote is succesfull", () => {
  const state = [
    {
      constent: "11",
      id: 1,
      votes: 2,
    },
    {
      constent: "22",
      id: 2,
      votes: 4,
    },
  ];

  deepFreeze(state);

  const action = {
    type: "anecdotes/updateAnecdote",
    payload: {
        content: "22",
        id: 2,
        votes: 5
    }
  };

  const newState = anecdoteReducer(state, action);

  expect(newState.length).toBe(2);
  expect(newState[1]).toEqual(action.payload);
});
