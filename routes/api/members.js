const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//============================================================
//CREATE REST API -  no database fetch just hardcoded data in Members.js

router.get('/', (req, res) => res.json(members)); //returns whole json file on home / url

//GET SINGLE MEMBER  - :id is a parameter passed to url for example http://localhost:5000/api/members/1 will return object with id: 1
router.get('/:id', (req, res) => { 

   //check if id is found by using "some" method that returns boolean
   const found = members.some(member => member.id === parseInt(req.params.id));
   
   if(found){
   res.json(members.filter(member => member.id === parseInt(req.params.id)));
   } else { //if not found we give status response 400 meaning its a bad request and a json object with message
       res.status(400).json({msg: `No member found with id of ${req.params.id}`});
   }
});

//CREATE MEMBER- when you create something on a server use POST method instead of GET

router.post('/', (req, res) => {
    const newMember = {
        name: req.body.name,  // in order to be able to read req.body we have to use parser midlleware on server.js express.json()
        email: req.body.email,
        id: uuid.v4(),
        status: 'active'
    }


   // make sure they pass email and name if not return 400 response which means bad request
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include name and email'});
    };


    members.push(newMember); //push new object to server (in this case its hardcoded object in Members.js normally it would be a command to push data to data base)
    console.log(members);
    res.json(members); //return members object inluding newMember
    
});

//UPDATE MEMBER
router.put('/:id', (req, res) => { 

    //check if id is found by using "some" method that returns boolean
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {//req.params.id is the id passed in url
                member.name = updMember.name ? updMember.name : member.name; //if its passed then change otherwise leave the old one
                member.email = updMember.email ? updMember.email : member.email;

                //we have to send response as well
                res.json({ msg: 'Member updated', member });
            };
        })
     } else { //if not found we give status response 400 meaning its a bad request and a json object with message
        res.status(400).json({msg: `No member found with id of ${req.params.id}`});
       }
 });

 //DELETE MEMBER
 router.delete('/:id', (req, res) => { 

    //check if id is found by using "some" method that returns boolean
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if(found){
    res.json({ msg: `Member with id of ${req.params.id} deleted`, members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else { //if not found we give status response 400 meaning its a bad request and a json object with message
        res.status(400).json({msg: `No member found with id of ${req.params.id}`});
    }
 });

module.exports = router;