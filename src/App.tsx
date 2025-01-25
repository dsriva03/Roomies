// import { useState } from 'react';
import './App.css';

import Interface from './Components/Interface.tsx';
import ChoreWheel from './Components/ChoreWheel.tsx';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div id="App">
      <h1>ROOMIES</h1>
        <div id="Sub">
          <Interface />
          <ChoreWheel />
        </div>
      </div>
    </>
  )
}

export default App
