const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.listen(4005, () => {
    console.log(colors.bgYellow.black.underline('Listening on 4005 EVETN_BUS '))
});
