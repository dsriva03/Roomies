const apiFetch = {};


//createUser 
apiFetch.createUser = async(username, email) => {
    try {

        const response = await fetch('http://localhost:8080/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email
            })
        });

        if (!response.ok){
            throw new Error(`Error in creating user: ${response.status}`)
        }

        const data = await response.json();
        console.log('Here is the created user: ', data);


    } catch(err){
        console.error("This is the error: ", err)
    };
};

//deleteUser
apiFetch.deleteUser = async(id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/deleteUser/${id}`, { //!check id proper syntax
        //!possibly pass in username instead s
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error('Error in deleting user: ', response.error)
        }

        const data = await response.json();
        console.log('This is the deleted user: ', data)


    } catch(err){
        console.error("THIS IS THE ERROR: ", err);
    }

};


//getUser (all)
apiFetch.getUser = async() => {
    try {
    
        const response = await fetch('http://localhost:8080/api/getUser'); //url of endpoint

        if (!response.ok){
            throw new Error(`Failed to get users: ${response.status}`);
        }

        const data = await response.json(); //parse response to JSON
        console.log('This is the data: ', data);

    } catch(err){
        console.error("This is the getUser error: ", err);

    };
}; //!double check that deletion is successful

//createChore
apiFetch.createChore = async(task_name, type) => {
    try {
        const response = await fetch('http://localhost:8080/api/createChore', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_name,
                type
            })
        });

        if (!response.ok){
            throw new Error('Error in creating a chore: ', response.status)
        }

        const data = await response.json()
        console.log('This is the new chore (data): ', data);


    } catch(err){
        console.error("This is the error, ", err)
    }
};

//assignChore
apiFetch.assignChore = async(userId, choreId) => {
    try {

    const response = await fetch('http://localhost:8080/api/assignChore', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            choreId
        })
    })

    if (!response.ok){
        throw new Error('Error in assigning chores ', response.error)
    }

    const data = await response.json()
    console.log('This is the new assigned chore data: ', data);

    } catch(err){
        console.error('This is the error: ', err)
    }
};

//deleteChore
apiFetch.deleteChore = async(id) => {
    try {
        const response = await fetch(`http://localhost:8080/api/deleteChore/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok){
            throw new Error('Error in deleting chore: ', response.error)
        }

        const data = await response.json();
        console.log('This is the deleted chore: ', data)


    } catch(err){
        console.error("THIS IS THE ERROR: ", err);
    }
}

//getChore (all)
apiFetch.getChores = async() => {
    try {
    
        const response = await fetch('http://localhost:8080/api/getChores'); //url of endpoint

        if (!response.ok){
            throw new Error(`Failed to get chores: ${response.status}`);
        }

        const data = await response.json(); //parse response to JSON
        console.log('Here are all the chores', data);
    

    } catch(err){
        console.error("This is the getChore error: ", err);

    };
}



export default apiFetch;