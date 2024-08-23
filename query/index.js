const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/posts", (req, res) => {

})

app.post("/evetns", (req, res) => {

})

app.listen(4002, ()=>{
    console.log("Listeing on port 4002 on QUERY SERVICE")
});