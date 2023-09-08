import { useState } from "react";
const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const calcTotal = () => {
    return good + bad + neutral;
  };
  const calcAverage = () => {
    const totalReviews = good + neutral + bad;
    const averageRating = (good * 1 + neutral * 0 + bad * -1) / totalReviews;
    return averageRating;
  };

  const calcPositive = () => {
    return good / (good + bad + neutral);
  };
  return (
    <>
      <h1>Statistics</h1>
      {good || neutral || bad ? (
        <div>
          <table>
            <tbody>
              <StatisticsLine text="good" value={good} />
              <StatisticsLine text="neutral" value={neutral} />
              <StatisticsLine text="bad" value={bad} />
              <StatisticsLine text="all" value={calcTotal()} />
              <StatisticsLine text="average" value={calcAverage()} />
              <StatisticsLine text="positive" value={calcPositive() + " %"} />
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Feedback Given</p>
      )}
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Header = () => {
    <h1>Give Feedback</h1>;
  };

  const FeedbackContainer = () => {
    const handleButtonClick = (type) => {
      switch (type) {
        case "good":
          setGood(good + 1);
          break;
        case "neutral":
          setNeutral(neutral + 1);
          break;
        case "bad":
          setBad(bad + 1);
          break;
        default:
          break;
      }
    };
    const Button = ({ type }) => {
      return <button onClick={() => handleButtonClick(type)}>{type}</button>;
    };
    return (
      <>
        <h1>Give Feedback</h1>
        <Button type="good" />
        <Button type="neutral" />
        <Button type="bad" />
      </>
    );
  };

  return (
    <>
      <Header />
      <FeedbackContainer></FeedbackContainer>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
