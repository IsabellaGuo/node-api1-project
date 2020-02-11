// implement your API here
const express = require ('express');

const Users = require('./data/db');

const server = express();

const port = 5000;

server.listen(port, () => console.log(`\n** API on port ${port} \n`));

//teaches express how to read JSON from the body
server.use(express.json()); //needed for POST, PUT and PATCH

server.get('/', (req, res) => {
    res.json({ hello: 'Isabella'})
})

//POST - create a user 
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if (!(userInfo && userInfo.name && userInfo.bio)){
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
        return true;
    }

    if (!(typeof userInfo.name === "string" && typeof userInfo.bio === "string")) {
        res.status(400).json({
            errorMessage: "Some fields have incorrect data"
        });
        return true;
    }

    Users
    .insert(userInfo)
    .then(user => {
        res.status(201).json({ ...userInfo, ...user });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"});
    });
    
});

//GET - view all the user objects
server.get('/api/users', (req, res) => {
    Users
    .find()
    .then(users => {
        res.status(200).json(users);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    });
})

//GET - Return user object with id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users
    .findById(id)
    .then(users => {
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            });
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
    });
})




//DELETE - remove user with specific id
server
.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users
    .remove(id)
    .then(users =>{
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "The user could not be removed"})
    });
})

//PUT - Update the user with specified id
server
.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;

    if (!(userInfo && userInfo.name && userInfo.bio)){
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        });
        return true;
    }

    if (!(typeof user.name === "string" && typeof user.bio === "string")) {
		res.status(400).json({
			errorMessage: "Some fields have incorrect data"
		});
		return true;
	}

    Users
    .update(id, user)
    .then(users => {
        if (users) {
            findById(id)
            .then (users => {
                res.status(200).json(users);
            });
            
        } else {
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage: "The user could not be removed"})
    });
})
