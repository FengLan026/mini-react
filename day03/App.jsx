// js pragma
/**@jsx React.createElement */
import React from './core/React.js'

function Counter({ num }) {
  return <div>count: {num}</div>
}
function Counter2({ num }) {
  return <div>count: {num}
    <Counter></Counter>
  </div>
}

function App() {
  return <div>
    123
    <Counter num={10}></Counter>
    <Counter num={20}></Counter>
    <Counter2></Counter2>
  </div>
}


export default App
