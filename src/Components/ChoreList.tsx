import apiFetch from '../apiFetch.js';
import { useState, useEffect } from 'react';

interface Chore {
  id: string; // ?  I think this is because supabase returns the number in the form of a string???
  task_name: string;
}

function ChoreList() {
  const [choreName, setChoreName] = useState<string>(''); /// current chore name (from input field) to pass into createChore invocation
  const [selectedChoreType, setSelectedChoreType] = useState<string>('daily'); /// current chore type (from input field) to pass into createChore invocation
  const [allChoresMap, setAllChoresMap] = useState<Chore[]>([]); /// array of all chore objects in database
  const [choreUpdated, setChoreUpdated] = useState<boolean>(false); /// a boolean used as a dependency for useEffect to trigger rerender when chore is created
  const [isOpen, setIsOpen] = useState<boolean>(false); /// used to manage visibility of the dropdown of chore list
  const options = ['daily', 'weekly', 'monthly', 'one-time']; /// chore type array for dropdown menu

  // ; HANDLER TO CREATE CHORE
  const createChore = async (givenTitle: string, givenType: string) => {
    await apiFetch.createChore(givenTitle, givenType);
    setChoreUpdated((prev) => !prev);
    setSelectedChoreType('daily');
    setChoreName('');
  };

  // ; HANDLER TO DELETE CHORE
  const handleDelete = async (id: string) => {
    console.log('DELETE CHORE');
    console.log('id from param in handleDelete', id);
    await apiFetch.deleteChore(id);
    setChoreUpdated((prev) => !prev);
  };

  // ; FUNCTION TO GET CHORES (for displaying in chorelist)
  const getChores = async () => {
    try {
      const result = await apiFetch.getChores();
      setAllChoresMap(result);
    } catch (err) {
      console.error('This is the ChoreList useEffect error: ', err);
    }
  };

  // ; USEEFFECT FOR RERENDER IN CHORE CREATION AND DELETION
  useEffect(() => {
    getChores();
  }, [choreUpdated]);

  // ; STYLING PRESETS FOR SHADOWS
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
      <h1 className='font-display text-sky-900'>Chores</h1>
      <div className='flex gap-2'>
        <input
          style={inputStyle}
          className='font-sans text-sky-900 py-1 px-2 m-1  bg-white border-white rounded-[50px] grow-2 outline-amber-200'
          placeholder='Chore...'
          onChange={(event) => {
            setChoreName(event.target.value);
          }}
          value={choreName}
        />
        <div className='relative inline-block text-left' style={inputStyle}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='w-full px-2 py-1 font-sans text-sky-900 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:none flex items-center justify-between'
          >
            <span>{selectedChoreType}</span>
            <svg
              className={`ml-2 h-5 w-5 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          {isOpen && (
            <div className='absolute  mt-1 w-48 rounded-md bg-white shadow-lg border border-gray-300'>
              <div className='py-1'>
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedChoreType(option);
                      setIsOpen(false);
                    }}
                    className='block w-full text-left font-sans text-sky-900 px-2 py-1 text-sm bg-white hover:bg-fuchsia-400 hover:text-white focus:bg-gray-100 focus:outline-none'
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          className='font-sans py-1 px-2 m-1 text-white shadow-2xl bg-fuchsia-400 hover:bg-fuchsia-500 border-white rounded-[50px] grow-1'
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
            createChore(choreName, selectedChoreType);
          }}
        >
          Add Chore
        </button>
      </div>
      <div className='m-6'></div>
      {allChoresMap.map((chore) => (
        <div key={chore.id} className='flex'>
          <input
            style={viewItemStyle}
            className='font-sans text-sky-900 py-1 px-2 m-1 shadow-2xl bg-white border-white rounded-[50px] grow-9 outline-none'
            value={chore.task_name}
            readOnly
          />
          <button
            className='font-sans py-1 px-2 m-1 text-white shadow-2xl bg-red-400 hover:bg-red-500 border-white rounded-[50px] grow-1 justify-center flex'
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
              handleDelete(chore.id);
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

export default ChoreList;
