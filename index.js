// implement your API here
const express = require ('express');

const Users = require('./data/db');

const server = express();

//teaches express how to read JSON from the body
server.use(express.json()); //needed for POST, PUT and PATCH

server.get('/', (req, res) => {
    res.json({ hello: 'Isabella'})
})

//create a user 
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    Users
    .add(userInfo)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    })
    
})

//view all the user objects
server.get('/api/users', (req, res) => {
    Users
    .find()
    .then(users => {
        res.status(200).json(users);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    });
})


const port = 5000;

server.listen(port, () => console.log(`\n** API on port ${port} \n`));