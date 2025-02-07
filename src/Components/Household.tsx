import apiFetch from '../apiFetch.js';
import { useState, useEffect } from 'react';

//Interface for Roomies Map typing
interface Roomies {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

interface HouseholdProps {
  setRoomieUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function Household({ setRoomieUpdated }: HouseholdProps) {
  const [roomieName, setRoomieName] = useState<string>('');
  const [roomieEmail, setRoomieEmail] = useState<string>('');
  const [allRoomiesMap, setAllRoomiesMap] = useState<Roomies[]>([]);
  const [updateHousehold, setUpdateHousehold] = useState<boolean>(false);

  const getUser = async () => {
    try {
      const result = await apiFetch.getUsers();
      const usersObjArr = [...result];
      setAllRoomiesMap(usersObjArr);
    } catch (err) {
      console.error('This is the Household useEffect error: ', err);
    }
  };

  // ; HANDLER TO CREATE ROOMIE
  const createRoomie = async (givenName: string, givenEmail: string) => {
    await apiFetch.createUser(givenName, givenEmail);
    setRoomieName('');
    setRoomieEmail('');
    console.log('roomieName after submission', roomieName);
    setRoomieUpdated((prev) => !prev);
    setUpdateHousehold((prev) => !prev);
  };

  // ; DELETE ROOMIE
  const deleteRoomie = async (id: number) => {
    console.log('DELETE');
    console.log('id in handleDelete in HouseHold', id);
    const res = await apiFetch.deleteUser(id);
    console.log('this is the response ', res);
    setRoomieUpdated((prev) => !prev);
    setUpdateHousehold((prev) => !prev);
  };

  // ; USE-EFFECT TO RERENDER WHEN NEW ROOMIE IS CREATED
  useEffect(() => {
    getUser();
  }, [updateHousehold]);

  const inputStyle = {
    boxShadow: `
        0 10px 25px -3px rgba(0, 0, 0, 0.3),
        0 4px 6px -2px rgba(0, 0, 0, 0.6),
        0 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };

  const viewItemStyle = {
    boxShadow: `
        0 10px 25px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.1),
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };

  return (
    <div className='p-2 m-4 h-fit' id='Household'>
      <h1 className='font-display text-sky-900'>Our Roomies</h1>
      <div className='flex'>
        <input
          style={inputStyle}
          className='font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200'
          placeholder='Roomie Name...'
          onChange={(event) => {
            setRoomieName(event.target.value);
          }}
          value={roomieName}
        />
        <input
          style={inputStyle}
          className='font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200'
          placeholder='Roomie Email...'
          onChange={(event) => {
            setRoomieEmail(event.target.value);
          }}
          value={roomieEmail}
        />
        <button
          className='font-display py-1 px-2 m-1 font-normal text-sky-900 shadow-2xl bg-[#D6EFED] hover:bg-[#B7D3DF] border-white rounded-[50px] grow-2 '
          style={{
            boxShadow: `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `,
            transition: 'all 0.1s ease-in-out',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow =
              'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
            e.currentTarget.style.transform = 'translateY(2px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `;
            e.currentTarget.style.transform = 'none';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `
                        0 10px 25px -3px rgba(0, 0, 0, 0.3),
                        0 4px 6px -2px rgba(0, 0, 0, 0.6),
                        0 20px 25px -5px rgba(0, 0, 0, 0.2),
                        inset 0 2px 2px rgba(255, 255, 255, 0.95)
                        `;
            e.currentTarget.style.transform = 'none';
          }}
          onClick={() => {
            createRoomie(roomieName, roomieEmail);
          }}
        >
          Add
        </button>
      </div>

      <div className='m-6'></div>
      {allRoomiesMap.map((user) => (
        <div key={user.id} className='flex'>
          <input
            style={viewItemStyle}
            className='font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none'
            value={user.username}
            readOnly
          />
          <button
            className='font-sans py-1 px-2 m-1  text-[#717a7a] shadow-2xl bg-[#FFDFD3] hover:bg-[#85586F] border-white rounded-[50px] grow-1 justify-center flex'
            style={{
              boxShadow: `
                            0 10px 25px -3px rgba(0, 0, 0, 0.3),
                            0 4px 6px -2px rgba(0, 0, 0, 0.6),
                            0 20px 25px -5px rgba(0, 0, 0, 0.2),
                            inset 0 2px 2px rgba(255, 255, 255, 0.95)
                            `,
              transition: 'all 0.1s ease-in-out',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow =
                'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.transform = 'translateY(2px)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = `
                            0 10px 25px -3px rgba(0, 0, 0, 0.3),
                            0 4px 6px -2px rgba(0, 0, 0, 0.6),
                            0 20px 25px -5px rgba(0, 0, 0, 0.2),
                            inset 0 2px 2px rgba(255, 255, 255, 0.95)
                            `;
              e.currentTarget.style.transform = 'none';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `
                            0 10px 25px -3px rgba(0, 0, 0, 0.3),
                            0 4px 6px -2px rgba(0, 0, 0, 0.6),
                            0 20px 25px -5px rgba(0, 0, 0, 0.2),
                            inset 0 2px 2px rgba(255, 255, 255, 0.95)
                            `;
              e.currentTarget.style.transform = 'none';
            }}
            onClick={() => {
              deleteRoomie(user.id);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Household;

//OLD HOUSEHOLD COMPONENT
// import apiFetch from '../apiFetch.js';
// import { useState, useEffect } from 'react';

// //Interface for Roomies Map typing
// interface Roomies {
//   id: number;
//   username: string;
//   email: string;
//   created_at: Date;
// }

// function Household() {
//   const [roomieName, setRoomieName] = useState<string>('');
//   const [roomieEmail, setRoomieEmail] = useState<string>('');
//   const [allRoomiesMap, setAllRoomiesMap] = useState<Roomies[]>([]);
//   const [roomieUpdated, setRoomieUpdated] = useState<boolean>(false);

//   const getUser = async () => {
//     try {
//       const result = await apiFetch.getUsers();
//       const usersObjArr = [...result];
//       setAllRoomiesMap(usersObjArr);
//     } catch (err) {
//       console.error('This is the Household useEffect error: ', err);
//     }
//   };

//   // ; HANDLER TO CREATE ROOMIE
//   const createRoomie = async (givenName: string, givenEmail: string) => {
//     await apiFetch.createUser(givenName, givenEmail);
//     setRoomieName('');
//     setRoomieEmail('');
//     console.log('roomieName after submission', roomieName);
//     setRoomieUpdated((prev) => !prev);
//   };

//   // ; DELETE ROOMIE
//   const deleteRoomie = async (id: string) => {
//     console.log('DELETE');
//     console.log('id in handleDelete in HouseHold', id);
//     await apiFetch.deleteUser(id);
//     setRoomieUpdated((prev) => !prev);
//   };

//   // ; USE-EFFECT TO RERENDER WHEN NEW ROOMIE IS CREATED
//   useEffect(() => {
//     getUser();
//   }, [roomieUpdated]);

//   const inputStyle = {
//     boxShadow: `
//         0 10px 25px -3px rgba(0, 0, 0, 0.3),
//         0 4px 6px -2px rgba(0, 0, 0, 0.6),
//         0 20px 25px -5px rgba(0, 0, 0, 0.2),
//         inset 0 2px 2px rgba(255, 255, 255, 0.95)
//         `,
//   };

//   const viewItemStyle = {
//     boxShadow: `
//         0 10px 25px -3px rgba(0, 0, 0, 0.1),
//         0 4px 6px -2px rgba(0, 0, 0, 0.1),
//         0 20px 25px -5px rgba(0, 0, 0, 0.1),
//         inset 0 2px 2px rgba(255, 255, 255, 0.95)
//         `,
//   };

//   return (
//     <div className='p-2 m-4 h-fit' id='Household'>
//       <h1 className='font-display text-sky-900'>Our Roomies</h1>
//       <div className='flex'>
//         <input
//           style={inputStyle}
//           className='font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200'
//           placeholder='Roomie Name...'
//           onChange={(event) => {
//             setRoomieName(event.target.value);
//           }}
//           value={roomieName}
//         />
//         <input
//           style={inputStyle}
//           className='font-sans text-sky-900 py-1 px-2 m-1 bg-white border-white rounded-[50px] grow-3 outline-amber-200'
//           placeholder='Roomie Email...'
//           onChange={(event) => {
//             setRoomieEmail(event.target.value);
//           }}
//           value={roomieEmail}
//         />
//         <button
//           className='font-display py-1 px-2 m-1 font-normal text-sky-900 shadow-2xl bg-[#D6EFED] hover:bg-[#B7D3DF] border-white rounded-[50px] grow-2 '
//           style={{
//             boxShadow: `
//                         0 10px 25px -3px rgba(0, 0, 0, 0.3),
//                         0 4px 6px -2px rgba(0, 0, 0, 0.6),
//                         0 20px 25px -5px rgba(0, 0, 0, 0.2),
//                         inset 0 2px 2px rgba(255, 255, 255, 0.95)
//                         `,
//             transition: 'all 0.1s ease-in-out',
//           }}
//           onMouseDown={(e) => {
//             e.currentTarget.style.boxShadow =
//               'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
//             e.currentTarget.style.transform = 'translateY(2px)';
//           }}
//           onMouseUp={(e) => {
//             e.currentTarget.style.boxShadow = `
//                         0 10px 25px -3px rgba(0, 0, 0, 0.3),
//                         0 4px 6px -2px rgba(0, 0, 0, 0.6),
//                         0 20px 25px -5px rgba(0, 0, 0, 0.2),
//                         inset 0 2px 2px rgba(255, 255, 255, 0.95)
//                         `;
//             e.currentTarget.style.transform = 'none';
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.boxShadow = `
//                         0 10px 25px -3px rgba(0, 0, 0, 0.3),
//                         0 4px 6px -2px rgba(0, 0, 0, 0.6),
//                         0 20px 25px -5px rgba(0, 0, 0, 0.2),
//                         inset 0 2px 2px rgba(255, 255, 255, 0.95)
//                         `;
//             e.currentTarget.style.transform = 'none';
//           }}
//           onClick={() => {
//             createRoomie(roomieName, roomieEmail);
//           }}
//         >
//           Add
//         </button>
//       </div>

//       <div className='m-6'></div>
//       {allRoomiesMap.map((user) => (
//         <div key={user.id} className='flex'>
//           <input
//             style={viewItemStyle}
//             className='font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none'
//             value={user.username}
//             readOnly
//           />
//           <button
//             className='font-sans py-1 px-2 m-1  text-[#717a7a] shadow-2xl bg-[#FFDFD3] hover:bg-[#85586F] border-white rounded-[50px] grow-1 justify-center flex'
//             style={{
//               boxShadow: `
//                             0 10px 25px -3px rgba(0, 0, 0, 0.3),
//                             0 4px 6px -2px rgba(0, 0, 0, 0.6),
//                             0 20px 25px -5px rgba(0, 0, 0, 0.2),
//                             inset 0 2px 2px rgba(255, 255, 255, 0.95)
//                             `,
//               transition: 'all 0.1s ease-in-out',
//             }}
//             onMouseDown={(e) => {
//               e.currentTarget.style.boxShadow =
//                 'inset 0 2px 4px rgba(0, 0, 0, 0.2)';
//               e.currentTarget.style.transform = 'translateY(2px)';
//             }}
//             onMouseUp={(e) => {
//               e.currentTarget.style.boxShadow = `
//                             0 10px 25px -3px rgba(0, 0, 0, 0.3),
//                             0 4px 6px -2px rgba(0, 0, 0, 0.6),
//                             0 20px 25px -5px rgba(0, 0, 0, 0.2),
//                             inset 0 2px 2px rgba(255, 255, 255, 0.95)
//                             `;
//               e.currentTarget.style.transform = 'none';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.boxShadow = `
//                             0 10px 25px -3px rgba(0, 0, 0, 0.3),
//                             0 4px 6px -2px rgba(0, 0, 0, 0.6),
//                             0 20px 25px -5px rgba(0, 0, 0, 0.2),
//                             inset 0 2px 2px rgba(255, 255, 255, 0.95)
//                             `;
//               e.currentTarget.style.transform = 'none';
//             }}
//             onClick={() => {
//               deleteRoomie(user.id);
//             }}
//           >
//             <svg
//               xmlns='http://www.w3.org/2000/svg'
//               fill='none'
//               viewBox='0 0 24 24'
//               strokeWidth={1.5}
//               stroke='currentColor'
//               className='size-6'
//             >
//               <path
//                 strokeLinecap='round'
//                 strokeLinejoin='round'
//                 d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
//               />
//             </svg>
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Household;
