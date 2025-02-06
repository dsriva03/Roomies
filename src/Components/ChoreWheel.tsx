import { useEffect, useRef, useState } from 'react';
import apiFetch from '../apiFetch.js';
import { shuffle } from '../utils/shuffleFunction.js';

interface Chores {
  id: number;
  task_name: string;
  type: string;
  assigned_to: string | null;
  status: string;
  due_date: Date | null;
  created_at: Date | null;
}

interface Roomies {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}
interface Assignment {
  chores: choreIdAndTaskName[];
  username: string;
  id: number;
}

// interface choreIdAndTaskName {
//   id: number;
//   task_name: string;
// }

interface choreIdAndTaskName {
  [key: number]: string;
}

//; CHORE WHEEL COMPONENT
function ChoreWheel() {
  const [allRoomiesMap, setAllRoomiesMap] = useState<Roomies[]>([]);
  const [allChoresMap, setAllChoresMap] = useState<Chores[]>([]);
  const [roomieUpdated, setRoomieUpdated] = useState<boolean>(false);
  const [choreUpdated, setChoreUpdated] = useState<boolean>(false);
  const [shuffledAssignment, setShuffledAssignment] = useState<Assignment[]>([
    // {
    //   chores: [{ 1: 'sweep' }, { 2: 'take out trash' }],
    //   id: 1,
    //   username: 'Adeets',
    // },
  ]);

  const containerRef = useRef(null);
  const [rotation, setRotation] = useState<number>(0);

  // get chores
  const getChores = async () => {
    try {
      const result = await apiFetch.getChores();
      setAllChoresMap(result);
    } catch (err) {
      console.error('This is the ChoreList useEffect error: ', err);
    }
  };

  // get users
  const getUser = async () => {
    try {
      const result = await apiFetch.getUsers();
      const usersObjArr = [...result];
      setAllRoomiesMap(usersObjArr);
    } catch (err) {
      console.error('This is the Household useEffect error: ', err);
    }
  };

  // ; USEEFFECT FOR RERENDER IN CHORE CREATION AND DELETION
  useEffect(() => {
    getChores();
  }, [choreUpdated]);

  // ; USE-EFFECT TO RERENDER WHEN NEW ROOMIE IS CREATED
  useEffect(() => {
    getUser();
  }, [roomieUpdated]);

  // ; HANDLER TO SHUFFLE CHORE ARRAY AND FORMAT USERS ARRAY
  // allChoresMap: Chores[],
  // allRoomiesMap: Roomies[]
  const handleExtraction = (shuffledChores: Chores[]) => {
    // const allChoresMapCopy = [...allChoresMap];

    // const shuffledChores = shuffle(allChoresMapCopy);
    // console.log('shuffledChores: ', shuffledChores);

    const choresIdAndTaskName: choreIdAndTaskName[] = [];
    // const choresArr: choreIdAndTaskName[] = [];
    shuffledChores.forEach((chores: Chores) => {
      const newObj: choreIdAndTaskName = {
        [chores['id']]: chores.task_name,
      };
      // console.log('newObj:', newObj);
      choresIdAndTaskName.push(newObj);
    });
    // console.log('choresIdandTaskName:', choresIdAndTaskName);

    // console.log('allRoomiesMap: ', allRoomiesMap);

    const allRoomiesMapCopy = [...allRoomiesMap]; /// array of objects
    // console.log('allroomiesmapcopy: ', allRoomiesMapCopy);

    // console.log('choresArr',choresArr)
    const roomiesIdAndName: [number, string][] = [];
    allRoomiesMapCopy.forEach((user) =>
      roomiesIdAndName.push([user.id, user.username])
    );
    // console.log('roomiesIdAndName:', roomiesIdAndName);
    return [roomiesIdAndName, choresIdAndTaskName];
  };
  // console.log(handleShuffleAndAssign(allChoresMap, allRoomiesMap));

  // ; HANDLER FUNCTION TO SHUFFLE CHORES AND SIGN TO USERS
  const combineData = (user, chores) => {
    // console.log('roomiesArr: ', roomiesArr);
    //init output arr
    const output = [];
    //while a2 (chores) has a length greater than 0 create a user obj with the needed properties
    while (chores.length > 0) {
      // if we have more chores than users...
      if (user.length === 0) {
        //iterate over available users in output from the beginning of the arr
        for (let i = 0; i < output.length; i++) {
          //pop a chore arr from chores
          const current = chores.pop();
          //get the user at the current index
          //current shape is user {id: id, username: username, taskId: [id], taskName: [taskName]}
          //push the extra task id in the task arr and taskname in the taskname arr
          output[i].chores.push(current);
          // console.log(`i is ${i} and output length is ${output.length}. Reset i at ${output.length - 1} if chores length is still above 0. chores length is: ${chores.length}`);
          // console.log(`assign ${current} to ${output[i].username}`)
          if (chores.length > 0 && i >= output.length - 1) {
            //assign to -1 so that when the loop resets it will go back to 0
            i = -1;
            // console.log(`resetting i to ${i} now`)
          } else if (chores.length === 0) {
            break;
          }
        }
        break;
      }
      //pop a user arr from roomies. it should contain [id, username]
      const current1 = user.pop();
      //pop a chore from chores. it should contain [id, taskName]
      const current2 = chores.pop();
      //create a user obj with needed keys and fill with popped array values
      const userObj = {
        id: current1[0],
        username: current1[1],
        chores: [current2],
      };
      //push the new obj to the output arr
      output.push(userObj);
    }
    return output;
  };

  //; ONE HANDLER TO RULE THEM ALL...
  const handleShuffleConvertFetch = async () => {
    // ; INVOKE SHUFFLE HERE INSTEAD
    const allChoresMapCopy = [...allChoresMap];
    const shuffledChores = shuffle(allChoresMapCopy);
    const shuffledArr = handleExtraction(shuffledChores);
    console.log('shuffledArr:', shuffledArr);
    const users = shuffledArr[0];
    const chores = shuffledArr[1];
    const combined = combineData([...users], [...chores]);

    // console.log('combined: ', combined);

    try {
      // const = shuffledAssignmentCopy =
      // const copyArr = [...shuffledAssignment];

      const response = await apiFetch.assignChore(combined);

      if (response) {
        console.log('AssignChore Response:', response);
      } else {
        console.warn('No response received from apiFetch.assignChore');
      }
      // const data = await response.json();

      // console.log('syncedCombineLog', combined);
      setShuffledAssignment(combined);
      // console.log('syncedShuffleLog', shuffledAssignment);
    } catch (err) {
      console.error('Error in apiFetch.assignChore(shuffledAssignment)', err);
    }
  };

  useEffect(() => {
    getChores();
    getUser();
    /// INVOKE CHOREWHEELDISPLAY
  }, [shuffledAssignment]);

  //; CHORE WHEEL ANIMATION
  useEffect(() => {
    let startTime: number;
    const duration = 1000; // 5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < duration) {
        const newRotation = (elapsed / duration) * 360; // Gradually rotate from 0 to 360 degrees
        setRotation(newRotation);
        requestAnimationFrame(animate);
      } else {
        setRotation(360); // Ensure it stops at a full rotation
      }
    };

    requestAnimationFrame(animate);
  }, []);
  // run choreWheelDisplay() everytime allChoresMap, allRoomiesMap, and Items rerender state
  useEffect(() => {
    console.log('shuffledAssignment', shuffledAssignment);
    choreWheelDisplay();
  }, []);
  // ; HANDLER TO PULL UPDATED ROOMIESMAP AND CHORESMAP FOR DYNAMIC WHEEL

  // > app renders initially: trigger chore wheel display which invokes map on items array on line 368
  // > when we hit shuffle, the database updated then rerenders the chorewheel---> this function is invoked because of rerending of app
  const choreWheelDisplay = () => {
    /// access allChoresMap and allRoomiesMap
    //invoke combineData
    // handleShuffleAndAssign(allChoresMap, allRoomiesMap);
    const vanillaExtract = handleExtraction(allChoresMap);
    ///convert data into items format reference down below
    const users = vanillaExtract[0];
    const chores = vanillaExtract[1];
    const combined = combineData(users, chores);
    /// updated items state?
    ///
    setShuffledAssignment(combined);
  };

  const items = [
    {
      chores: [{ 1: 'sweep' }, { 2: 'take out trash' }],
      id: 1,
      username: 'Adeets',
    },
    {
      chores: [{ 3: 'call the cops' }, { 4: 'dance' }],
      id: 2,
      username: 'joshy',
    },
    {
      chores: [
        { 5: 'lie to cops' },
        { 6: 'hide evidence' },
        { 7: 'turn life around' },
      ],
      id: 2,
      username: 'Mj',
    },
    {
      chores: [
        { 8: 'fight police' },
        { 9: 'lose to police' },
        { 10: 'jailbreak >:)' },
      ],
      id: 2,
      username: 'Amrita',
    },
  ];

  //; CUSTOM COLORS ARRAY
  const colors = [
    '#9c7b8c',
    '#9fc2d1',
    '#C0BBCF',
    '#898AA6',
    '##badcd9',
    '##DEB6AB',
    '#957DAD',
    '#EOBBe4',
    '#FEC8D8',
  ];
  // Calculate the degrees per item for equal slices.
  const degreePerItem = 360 / items.length;

  // Build the conic-gradient string dynamically.
  const backgroundString = `conic-gradient(
      ${items
        .map((_, i) => {
          const start = i * degreePerItem;
          const end = (i + 1) * degreePerItem;
          // Each slice gets a unique color. Adjust the hue multiplier as needed.
          return `${colors[i % colors.length]} ${start}deg ${end}deg`;
        })
        .join(', ')}
    )`;

  const choreWheelContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `
        10px 10px 25px -3px rgba(0, 0, 0, 0.3),
        10px 4px 6px -2px rgba(0, 0, 0, 0.3),
        10px 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };
  const choreWheelStyle = {
    width: '100%',
    aspectRatio: '1 / 1',
    borderRadius: '50%',
    border: '5px #aa9e97',
    height: '100%',
    maxWidth: '400px',
    maxHeight: '400px',
    transform: `rotate(${rotation}deg)`,
    transition: 'transform 0.5s ease-in-out',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: backgroundString,
  };

  return (
    <>
      <div
        className='p-2 m-4 h-8/10 w-1/2 border-[#aa9e97] rounded-[50px] border-4 bg-[#f8ecd1]'
        id='ChoreWheel'
      >
        <h1 className='text-2xl font-display font-semibold text-sky-900'>
          Chore Wheel
        </h1>
        <div className='flex justify-start'>
          <button
            className='font-display py-1 px-2 max-w-3/10 m-1 font-normal text-sky-900 shadow-2xl bg-[#D6EFED] hover:bg-[#B7D3DF] border-white rounded-[50px] grow-1'
            type='submit'
            onClick={() => {
              handleShuffleConvertFetch();
            }}
          >
            Shuffle Chores
          </button>
        </div>
        <div id='wheelContainer' className='flex justify-center m-1 pt-15'>
          <div
            id='wheel'
            className='flex-none rounded-full'
            style={{ ...choreWheelContainerStyle, ...choreWheelStyle }}
          >
            <div
              ref={containerRef}
              className='relative w-120 h-120 rounded-full overflow-hidden'
              style={
                {
                  // Use the conic-gradient background for the pie slices.
                  // background: backgroundString,
                }
              }
            >
              {shuffledAssignment.map((item, i) => (
                <div
                  key={i}
                  className='absolute flex flex-col items-center  font-bold text-center'
                  style={{
                    // Position the label in the middle of each slice.
                    top: `calc(50% + ${
                      30 * Math.sin(((i + 0.5) * degreePerItem * Math.PI) / 180)
                    }%)`,
                    left: `calc(50% + ${
                      30 * Math.cos(((i + 0.5) * degreePerItem * Math.PI) / 180)
                    }%)`,
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'left',
                    width: '50px',
                  }}
                >
                  <span className='text-base font-extrabold block text-[#f8ecd1]'>
                    {item.username}
                  </span>
                  <span className='text-sm font-normal block'>
                    {`
                  ${item['chores']
                    .reduce((output, chore) => {
                      return output.concat(Object.values(chore));
                    }, [])
                    .join(', ')}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChoreWheel;
