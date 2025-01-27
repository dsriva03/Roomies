import express from 'express';
const apiRouter = express.Router(); //builds in router methods  


//!import controller, middleware functions
import roomiesController from '../controllers/roomiesController.js';

// get all users in database
apiRouter.get('/getUser', roomiesController.getUsers, (req, res) => {
    res.status(200).json(res.locals.users);

});

// create new User
apiRouter.post('/createUser', 
    roomiesController.createUser,(req, res) => res.status(200).json(res.locals.newUser)
);

// delete existing user
apiRouter.delete('/deleteUser/:id',
    roomiesController.deleteUser,(req, res) => res.status(200).json(res.locals.deletedUser)
);

apiRouter.post('/createChore', 
    roomiesController.createChore, (req, res) => res.status(200).json(res.locals.newChore)
)

apiRouter.put('/assignChore',
    roomiesController.assignChore, (req, res) => res.status(200).json(res.locals.assignedChore)
)

//delete chore
apiRouter.delete('/deleteChore/:id',
    roomiesController.deleteChore, (req, res) => res.status(200).json(res.locals.deletedChore))


//get chores
apiRouter.get('/getChores',
    roomiesController.getChores, (req, res) => res.status(200).json(res.locals.chores))





export default apiRouter; //!check if second export overrides 

//!break it up between user and chore router 
    //! either split into pages or split express.Router