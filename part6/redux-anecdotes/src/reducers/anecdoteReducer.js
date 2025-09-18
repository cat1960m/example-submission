//const getId = () => (100000 * Math.random()).toFixed(0);

/*const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];





 export const createAnecdote = (text) => ({
  type: "ADD",
  payload: {
    content: text,
    votes: 0,
    id: getId(),
  },
});

export const vote = (id) => ({
  type: "VOTE",
  payload: {
    id,
  },
});

const anecdoteReducer = (
  state = anecdotesAtStart.map((text) => ({
    content: text,
    votes: 0,
    id: getId(),
  })),
  action
) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        action.payload,
      ];
    case "VOTE": {
      const itemToChange = state.find(
        (item) => item.id === action.payload.id
      );
      const newItem = itemToChange
        ? { ...itemToChange, votes: itemToChange.votes + 1 }
        : itemToChange;
      return state.map((item) =>
        item.id === action.payload.id ? newItem : item
      );
    }
    default:
      return state;
  }
};

export default anecdoteReducer; */

import { createSlice } from "@reduxjs/toolkit";
import services from "../services/anecdotes";

const initialState = [];

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload);
    },
    updateAnecdote: (state, action) => {
      const id = action.payload.id;
      const newState = state.map((anecdote) => {
        return anecdote.id === id ? action.payload : anecdote;
      });

      return newState;
    },
    addAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { addAnecdote, updateAnecdote, addAnecdotes } =
  anecdotesSlice.actions;

export const initializeData = () => async (dispatch) => {
  const data = await services.getAll();
  console.log("data", data);
  dispatch(addAnecdotes(data));
};
export const createAnecdote = (content) => async (dispatch) => {
  const data = await services.addNew(content);
  dispatch(addAnecdote(data));
};

export const vote = (anecdote) => async (dispatch) => {
  const updatingAnecdote = {...anecdote, votes: anecdote.votes +1};
  const data = await services.updateAnecdote(updatingAnecdote)
  dispatch(updateAnecdote(data))
};


export default anecdotesSlice.reducer;
