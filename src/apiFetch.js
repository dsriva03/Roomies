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
    console.error('This is the error, ', err);
  }
};

// assignChore
// apiFetch.assignChore = async(usersTurnIndex, chores) => {
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
