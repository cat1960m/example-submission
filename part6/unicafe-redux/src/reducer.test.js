import deepFreeze from "deep-freeze";
import reducer from "./reducer";

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

test("good is incremented", () => {
  const state = initialState;

  const action = {
    type: "GOOD",
  };
  deepFreeze(state);

  const result = reducer(state, action);

  expect(result).toEqual({
    good: 1,
    ok: 0,
    bad: 0,
  });
});

test("should return a proper initial state when called with undefined state", () => {
  const result = reducer(undefined, { type: "" });

  expect(result).toEqual(initialState);
});

test("ok is incremented", () => {
  const state = initialState;

  const action = {
    type: "OK",
  };
  deepFreeze(state);

  const result = reducer(state, action);

  expect(result).toEqual({
    good: 0,
    ok: 1,
    bad: 0,
  });
});

test("bad is incremented", () => {
  const state = initialState;

  const action = {
    type: "BAD",
  };
  deepFreeze(state);

  const result = reducer(state, action);

  expect(result).toEqual({
    good: 0,
    ok: 0,
    bad: 1,
  });
});

test("reset is working", () => {
  const state = initialState;

  const action = {
    type: "RESET",
  };
  deepFreeze(state);

  const result = reducer(state, action);

  expect(result).toEqual(initialState);
});
