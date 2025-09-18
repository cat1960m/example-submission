const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const reducer = (state = initialState, action) => {
  console.log("action", action);
  switch (action.type) {
    case "GOOD": {
      console.log("-------GOOD");
      const newState = { ...state, good: state.good + 1 };
      console.log("new state", newState);
      return newState;
    }
    case "OK":
      return { ...state, ok: state.ok + 1 };
    case "BAD":
      return { ...state, bad: state.bad + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default reducer;
