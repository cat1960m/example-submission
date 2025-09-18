import filterReducer from "./filterReducer";
import deepFreeze from "deep-freeze";

test("filter reducer", () => {
  const action = {
    type: "filter/setFilter",
    payload: "U",
  };

  const state = "";
  deepFreeze(state);

  const newState = filterReducer(state, action);

  expect(newState).toBe("U");

});
