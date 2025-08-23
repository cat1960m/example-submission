import Part from "./Part";

const Content = ({ parts }) => {
  console.log("parts", parts);

  const total = parts.reduce((result, current) => {
    return result + current.exercises;
  }, 0);

  console.log("total", total);
  return (
    <>
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
      <div>
        <b>{"total of " + total + " exercises"}</b>
      </div>
    </>
  );
};

export default Content;
