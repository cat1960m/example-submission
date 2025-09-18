import { useMutation, useQueryClient } from "@tanstack/react-query";
import services from "../services/anecdotes";
import { useDispatchNotification } from "../context";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { showMessage, showError } = useDispatchNotification();

  const createAnecdoteMutation = useMutation({
    mutationFn: services.createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries(["anecdotes"]);
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
      showMessage(`"${newAnecdote.content}" is created`);
    },
    onError: (error) => {
      showError(error.message);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
