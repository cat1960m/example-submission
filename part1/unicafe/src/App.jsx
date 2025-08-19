import { useState } from "react";

const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const GOOD = 1;
  const NEUTRAL = 0;
  const BAD = -1;

  const total = good + neutral + bad;

  const getAverage = () =>
    (good * GOOD + neutral * NEUTRAL + bad * BAD) / total;

  const getPositive = () => (good * 100) / total;

  if (!total) {
    return "no feedback given";
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={getAverage()} />
        <StatisticLine text="positive" value={getPositive() + " %"} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button name="good" onClick={handleGoodClick} />
        <Button name="neutral" onClick={handleNeutralClick} />
        <Button name="bad" onClick={handleBadClick} />
      </div>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
