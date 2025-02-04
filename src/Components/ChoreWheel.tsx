import { useEffect, useRef, useState } from 'react';
import apiFetch from '../apiFetch.js';

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

//; CHORE WHEEL COMPONENT
function ChoreWheel() {
  const [allRoomiesMap, setAllRoomiesMap] = useState<Roomies[]>([]);
  const [allChoresMap, setAllChoresMap] = useState<Chores[]>([]);
  const [roomieUpdated, setRoomieUpdated] = useState<boolean>(false);
  const [choreUpdated, setChoreUpdated] = useState<boolean>(false);

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

  //split available chores to available users and assign
  useEffect(() => {
    // console.log('mapped users',allRoomiesMap);
    // console.log('mapped chores',allChoresMap);
    const choresArr = allChoresMap.map((chores) => {
      // console.log('chores idk',chores);
      const choreObj = {};
      choreObj[chores['id']] = chores.task_name;
      return choreObj;
    });
    // console.log('choresArr',choresArr)
    const roomiesArr = allRoomiesMap.map((users) => {
      return [users.id, users.username];
    });
    // console.log('roomiesArr',roomiesArr)
    //function to create a new combined array
    /**
     * Expected output shape:
     * roomieWTask = {
     * id: number,
     * username: string,
     * chores: [{choreId: choreName}, ...]
     * }
     */
    function combineData(user, chores) {
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
    }
    // console.log('combined', combineData(roomiesArr, choresArr));
  }, [allChoresMap, allRoomiesMap]);

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

  // useEffect(()=>{
  //   console.log('chores',allChoresMap[0].task_name);
  //   console.log('roomies',allRoomiesMap[0].username);
  // }, [allChoresMap, allRoomiesMap]);

  /**
   *
   */

  // const items = [

  // ]

  const items = ['josh walk the dog', 'Austin wash dog', 'Aditi sweep floors'];
  const choreWheelContainerStyle = {
    boxShadow: `
        10px 10px 25px -3px rgba(0, 0, 0, 0.3),
        10px 4px 6px -2px rgba(0, 0, 0, 0.3),
        10px 20px 25px -5px rgba(0, 0, 0, 0.2),
        inset 0 2px 2px rgba(255, 255, 255, 0.95)
        `,
  };
  const choreWheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0s linear",
  };

  // get chores
  const getChores = async () => {
    try {
      const result = await apiFetch.getChores();
      setAllChoresMap(result);
    } catch (err) {
      console.error("This is the ChoreList useEffect error: ", err);
    }
  };

  // get users
  const getUser = async () => {
    try {
      const result = await apiFetch.getUsers();
      const usersObjArr = [...result];
      setAllRoomiesMap(usersObjArr);
    } catch (err) {
      console.error("This is the Household useEffect error: ", err);
    }
  };

  useEffect(() => {
    getChores();
  }, []);

  // ; USE-EFFECT TO RERENDER WHEN NEW ROOMIE IS CREATED
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log("Chores", allChoresMap);
    console.log("users", allRoomiesMap);
  });

  // Calculate the degrees per item for equal slices.
  const degreePerItem = 360 / items.length;

  // Build the conic-gradient string dynamically.
  const backgroundString = `conic-gradient(
    ${items
      .map((_, i) => {
        const start = i * degreePerItem;
        const end = (i + 1) * degreePerItem;
        // Each slice gets a unique color. Adjust the hue multiplier as needed.
        return `hsl(${i * 60}, 70%, 60%) ${start}deg ${end}deg`;
      })
      .join(", ")}
  )`;

  return (
    <>
      <div
        className="p-2 m-4 h-8/10 w-1/2 border-white rounded-[50px]
             border-5"
        id="ChoreWheel"
      >
        <h1 className="text-2xl font-display font-semibold text-sky-900">
          Chore Wheel
        </h1>
        <div id="wheelContainer" className="flex justify-center m-10">
          <div
            id="wheel"
            className="flex-none rounded-full"
            style={choreWheelContainerStyle}
          >
            <div
              ref={containerRef}
              className="relative w-120 h-120 rounded-full overflow-hidden"
              style={{
                // Use the conic-gradient background for the pie slices.
                background: backgroundString,
              }}
            >
              {items.map((item, i) => (
                <span
                  key={i}
                  className="absolute text-white font-bold"
                  style={{
                    // Position the label in the middle of each slice.
                  top: `calc(50% + ${30 *
                    Math.sin(((i + 0.5) * degreePerItem * Math.PI) / 180)}%)`,
                  left: `calc(50% + ${30 *
                    Math.cos(((i + 0.5) * degreePerItem * Math.PI) / 180)}%)`,
                  transform: "translate(-50%, -50%)",
                  textAlign: "left",
                  width: "50px",
                  }}
                >
                    {item}
                  </span>
              ))}
                </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default ChoreWheel;
