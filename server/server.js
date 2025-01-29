//* require and import dependencies
//require the path 
import path from "path";

//require express
import express from "express";

//create an app instance of express
const app = express();

import apiRouter from './routes/api.js'; //importing RESTful routes from routes folder

const PORT = 8080; //defining port as 8080

//* build the dirname manually due to es6 restrictions
import {fileURLToPath} from 'url';

//*recreate dirname for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

//* global middleware functions

//cors acceptance middleware???
    //?check if need to install cors, don't think so because react and express are running on the same port 3000??
    //! install CORS, make sure its saved
import cors from 'cors';

app.use(cors());

//json parser middleware
app.use(express.json()); //deciphers text into readable json body

//urlencoded middleware
app.use(express.urlencoded()); //recognizes incoming request object into readable strings and arrays

//^^^^ NEED FOR POST AND PUT REQUESTS //-https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

//serving static files requests for client middleware //? MODIFY PATH LATER, is it App?
    //?serves React build app (when running npm run build)??? ASK 
app.use(express.static(path.resolve(__dirname, '../src/assets'))) //!DOUBLE CHECK!!!


app.use('/api', apiRouter);

//* logging HTTP method and the URL of the request for debugging 
    //logs the INCOMING request before it reaches any routes, so it needs to be before routes middleware
app.use((req, res, next) => {
    console.log(`${req.method}`, `${req.url}`)
    next(); //pass it over to the next function
});

//* Express moves onto route

//! add catch all error handler for incorrect routes
app.use((req, res) => res.status(404).send('This is not the page you\re looking for.'))


//* global error handler 
//create global error handler + Object.assign the error
app.use((err, req, res, _next) => {
    //create a default error to have an error to fall back on
    const defaultError = {
        log: 'Express caught an unknown middleware error.',
        status: 500, 
        message: {err: 'An error occured.'}
    };

    const errorObject = Object.assign({}, defaultError, err);
    console.log(errorObject.log); //log it for developer use, because returning it like status and message can reveal sensitive info
    return res.status(errorObject.status).json(errorObject.message)

});



//*create port for app to listen - 
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

//server.js: single source of truth: express follows the order of this page ONLY, so import other controllers and middlewares here and put them after the global middleware