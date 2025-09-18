import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import services from "./services/anecdotes";
import { useDispatchNotification } from "./context";

const App = () => {
  const {
    isPending,
    isError,
    data: anecdotes,
    error,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: services.getAll,
    retry: 1,
  });
  const { showMessage, showError } = useDispatchNotification();

  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: services.updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      const updated = anecdotes.map((item) =>
        item.id === anecdote.id ? anecdote : item
      );
      console.log("updated", updated);
      queryClient.setQueryData(["anecdotes"], updated);
      showMessage(`"${anecdote.content}" was voted`);
    },
    onError: (error) => {
      showError(error.message)
    }
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return (
      <span
        style={{
          margin: "5px",
          padding: "5px",
          color: "red",
        }}
      >
        Anecdote service not available due to problems in server
      </span>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
