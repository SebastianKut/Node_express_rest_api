const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');



//initialize express
const app = express();

//=====================================================

//to innitialize middleware imported from logger.js:
app.use(logger);

//=========================================
//Body parser middleware initialzation
//I have to use body parser for POST method so we can parse the body of POST method
app.use(express.json());
//also we have to handle form submission
app.use(express.urlencoded({ extended: false }));

//======================================================
//creat route
// app.get('/', (req, res) => {
//     //.send() - sends stuff to the browser
//     //res.send('Hello');
    
//     //send file
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

////============================================================

//SET STATIC FOLDER so you dnt have to specify the route just put files in there and it will work with one line of code
app.use(express.static(path.join(__dirname, 'public')));

//TO USE ROUTER WE DO THIS
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started om port ${PORT}`));



