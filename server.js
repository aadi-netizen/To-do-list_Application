// Import of modules
const express = require("express");
const cors = require("cors");
const storage = require("node-persist");

// Express server creation
const app = express();
const port = 5000;

// storage initializaion
storage.init();

// json-parser middleware
app.use(express.json());

// get API
app.get("/api/task", async (req, res) => {
    try {
        const resp = await storage.values();
        res.status(200).send(resp);
    }
    catch (error) {
        res.status(400).send(error);
    } });

// post API
app.post("/api/task", async (req, res) => {
    try {
        const id = generateUniqueId();
        console.log(id);
        const { toDoTask } = await storage.setItem(id, req.body);
        res.status(201).send("Task has been stored successfully.");
    } catch (error) {
        res.status(501).send(error);
    }
})

function generateUniqueId() {
    return Date.now().toString();
}


// port assignment for the server
app.listen(port, () => {
    console.log(`message: The server is running on port ${port}`);
});