const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const axios = require("axios")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/events", async (req, res) => {

    const event = req.body

    await axios.post("http://localhost:4000/events", event) // Post Service
    await axios.post("http://localhost:4001/events", event) // Comment Service
    await axios.post("http://localhost:4002/events", event) // Query Service
    await axios.post("http://localhost:4003/events", event) // Moderation Service

    res.send({ status: "OK" })
})

const server = app.listen(4005, () => {
    console.log(colors.bgYellow.black.underline('Listening on 4005 EVETN_BUS '))
});


server.setTimeout(5000); 