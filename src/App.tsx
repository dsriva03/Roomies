import { useState } from 'react';
import './App.css';

import Interface from './Components/Interface.tsx';
import ChoreWheel from './Components/ChoreWheel.tsx';

function App() {
  // const [count, setCount] = useState(0)
  /// create roomieUpdated state here and pass down as prop for a shared state
  /// this way, when household/user adds information to db, chore wheel can reflect
  /// those changes visually
  const [roomieUpdated, setRoomieUpdated] = useState<boolean>(false);

  return (
    <>
      <div
        id='App'
        className='p-2 m-4 h-screen w-auto border-white rounded-[50px] bg-[#FFDFD3] '
        style={{
          boxShadow: `
            0 10px 25px -3px rgba(0, 0, 0, 0.3),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 20px 25px -5px rgba(0, 0, 0, 0.2),
            inset 0 2px 2px rgba(255, 255, 255, 0.95)
          `,
        }}
      >
        <h1 className='text-4xl font-bold font-display text-sky-900 '>
          ROOMIES
        </h1>
        <div id='Sub' className='flex h-full'>
          <Interface setRoomieUpdated={setRoomieUpdated} />
          <ChoreWheel roomieUpdated={roomieUpdated} />
        </div>
      </div>
    </>
  );
}

export default App;
