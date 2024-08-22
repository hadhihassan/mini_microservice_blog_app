const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());



app.listen(4005, () => {
    console.log('Listening on 4005 EVETN_BUS ');
});
