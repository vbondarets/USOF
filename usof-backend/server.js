const PORT = process.env.PORT ? process.env.PORT : 5000;
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHanlingMinddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () =>{
    try{
        app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
    }
    catch(err){
        console.log("Error: " + err);
    }
}
start();