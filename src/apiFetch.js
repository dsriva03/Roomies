const apiFetch = {};

//createUser
apiFetch.createUser = async (username, email) => {
  try {
    const response = await fetch('http://localhost:8080/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error in creating user: ${response.status}`);
    }

    const data = await response.json();
    console.log('Here is the created user: ', data);
    return data;
  } catch (err) {
    console.error('This is the error: ', err);
  }
};

//deleteUser
apiFetch.deleteUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/api/deleteUser/${id}`, {
      //!check id proper syntax
      //!possibly pass in username instead s
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error in deleting user: ', response.error);
    }

    const data = await response.json();
    console.log('This is the deleted user: ', data);
    return data;
  } catch (err) {
    console.error('THIS IS THE ERROR: ', err);
  }
};

//getUser (all)
apiFetch.getUsers = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/getUser'); //url of endpoint

    if (!response.ok) {
      throw new Error(`Failed to get users: ${response.status}`);
    }

    const data = await response.json(); //parse response to JSON

    // console.log('This is the data: ', data);
    // const userArr = data.map((user) => user.username)
    // console.log('userArr in APIFetch: ' , userArr)

    return data;
  } catch (err) {
    console.error('This is the getUser error: ', err);
  }
}; //!double check that deletion is successful

//createChore
apiFetch.createChore = async (task_name, type) => {
  try {
    const response = await fetch('http://localhost:8080/api/createChore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_name,
        type,
      }),
    });

    if (!response.ok) {
      throw new Error('Error in creating a chore: ', response.status);
    }

    const data = await response.json();
    console.log('This is the new chore (data): ', data);
    return data;
  } catch (err) {
    console.error(
      'An error occured in apiFetch.createChore fetch request, ',
      err
    );
  }
};

// assignChore
apiFetch.assignChore = async (userChoreObjArr) => {
  /// we will recieve an array of objects which have the following properties:
  /// a userId: number
  /// a username: string
  /// a chore object arr: [{[choreId: number]: (task_name: string)}]
  // > Function to sift through input to create objects of one userId with one choreId

  /// create an assignment array (should contain two properties:
  /// userId: number, choreId: number)
  const assignmentArr = [];

  /// iterate over input array of objects
  userChoreObjArr.forEach((obj) => {
    for (const el of obj.choreId) {
      convertedArr.push({ userId: obj.userId, choreId: el });
    }
  });

  /// map over assignmenArr
  await Promise.all(
    /// for each assignment, make a put request to update assigned_to property in db
    assignmentArr.map(async (assignment) => {
      const userId = assignment.userId;
      const choreId = assignment.choreId;
      try {
        const response = await fetch('http://localhost:8080/api/assignChore', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            choreId,
          }),
        });
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(
          'An error occured in apiFetch.assignChore fetch request, ',
          err
        );
      }
    })
  );
};
//     // copy choresArr for mutations
//     const chores = [...choresArr]
//     // define an index to keep track of next user to assign
//     let userIndex = 0;
//     // iterate over chores array
//     for (let i = 0; i < chores.length - 1; i++) {
//         //with each iteration make a put request to the server
//         //to assign the current chore to the user at index userIndex

//        try {

//        } catch {

//         //where's your special little function huh
//         // so because this functeion just mutates the same array like the HH we did we have to assign the chorelist to new array first

//     }}

//     try {

//     const response = await fetch('http://localhost:8080/api/assignChore', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             userId,
//             choreId
//         })
//     })

//     if (!response.ok){
//         throw new Error('Error in assigning chores ', response.error)
//     }

//     const data = await response.json()
//     console.log('This is the new assigned chore data: ', data);
//     return data;

//     } catch(err){
//         console.error('This is the error: ', err)
//     }
// };

//deleteChore
apiFetch.deleteChore = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/deleteChore/${id}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Error in deleting chore: ', response.error);
    }

    const data = await response.json();
    console.log('This is the deleted chore: ', data);
    return data;
  } catch (err) {
    console.error('THIS IS THE ERROR: ', err);
  }
};

//getChore (all)
apiFetch.getChores = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/getChores'); //url of endpoint

    if (!response.ok) {
      throw new Error(`Failed to get chores: ${response.status}`);
    }

    const data = await response.json(); //parse response to JSON
    // const choresArr = data.map((chore) => chore.task_name)
    // console.log('Here are all the chores', data);
    return data;
  } catch (err) {
    console.error('This is the getChore error: ', err);
  }
};

export default apiFetch;
