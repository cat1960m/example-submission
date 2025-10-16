interface Props {
  totalExercises: number;
}

export const Total = ({ totalExercises }: Props) => {
  return <p>Number of exercises {totalExercises}</p>;
};
