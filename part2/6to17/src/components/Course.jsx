const Course = ({ course }) => {
  const Header = (props) => {
    return <h1>{props.header}</h1>;
  };

  const Content = (props) => {
    return (
      <>
        {props.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </>
    );
  };

  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}{" "}
      </p>
    );
  };

  const Total = ({ parts }) => {
    const totalExercises = parts.reduce(
      (total, part) => total + part.exercises,
      0
    );
    return <b>Total of {totalExercises} Exercises</b>;
  };
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
