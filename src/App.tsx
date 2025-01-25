// import { useState } from 'react';
import './App.css';

import Interface from './Components/Interface.tsx';
import ChoreWheel from './Components/ChoreWheel.tsx';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div id="App" className="p-2 m-4 h-[1000px] w-auto border-white rounded-[50px]">
      <h1 className="text-3xl font-bold font-sans text-sky-900 ">ROOMIES</h1>
        <div id="Sub" className='flex h-full'>
          <Interface />
          <ChoreWheel />
        </div>
      </div>
    </>
  )
}

export default App
