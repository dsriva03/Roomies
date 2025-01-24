const express = require("express");
const app = express(); //creating an instance of the app

//create route for backend API
    //create an entry point for this route, so we can send data from this backend to this frontend
app.get("/api", (req, res) => {
    res.json({ fruits: ['apple', 'banana', 'orange']})
});

//run our app
app.listen(8080, () => {
    console.log("Server started on port 8080")
});