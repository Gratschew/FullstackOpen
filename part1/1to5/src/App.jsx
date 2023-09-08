
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  
  const Header = (props)=>{
    return <h1>{props.header}</h1>
  }  

  const Content = (props) => {
    return <>{props.parts.map((part, index) => (
      <Part key={index} part={part} />
    ))}</>
  }

  const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises} </p>
  }
  
  const Total = ({parts}) => {
    const totalExercises = parts.reduce((total, part) => total + part.exercises, 0);
   return <p>{totalExercises}</p>
  }
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }



export default App