/** IMPORTANT - START BACKEND:
 //In terminal in VS code type 
// node index.js
// (Runs on http://localhost:3000)
// if terminal instruction correct then
//expect to see 'task manager app is ready to use on http://localhost:3000'
//type nodemon in terminal to invoke nodemon and negate use of Ctl^ C and node index, respectively to stop and start the server
*/

const express = require('express')

const app = express()

const taskRoutes = require('./src/routes/task') //gives access to router in routes/task file

app.use(express.json());  // with out this cannot destructure property 'text' of req.body IMPORTANT put this in the code this before the routes

app.use('/tasks', taskRoutes) //The main name of the route goes here in this case '/tasks'

app.use(express.urlencoded( {extended: false} )) // express.urlencoded() is middleware that is required because in POST API cannot directly access req.body in express (line 88).  It is set to {extended: false} because we are not using complex data



app.get('/', (req, res) => {
    res.json({
        status: 'OK. App is running',
        now: new Date()
    })
})

app.listen(3000, () => {
    console.log('task manager app is ready to use on http://localhost:3000')
})


/*
 Task Manager App Design

 - Data requirements
    1. Task
        - id
        - title (string for the task name)
        - completed (Boolean value true/false)
        -   default: set to false

 - API's required
    1. GET/tasks - Returns list of all tasks ✅
    2. POST/tasks - Creates a new task
    3. PATCH/tasks/:id - Update an existing task, can also be used to mark a task as complete so only this single route is required
    4. DELETE/tasks/:id - Delete an existing task

 -  Tasks for this and other similar projects
    1. Create API's - demonstrate for this project
    2. Test API's using Postman - demonstrate for this project
    3. Create documentation to explain the API's (in theory)
        - what the API does
        - what the expected outcomes would be 
            - false scenarios
            - true scenarios
    4. Forward API's to front-end developer (in theory) to integrate into their application

 -  Main considerations
    - structure of data should follow the logic of the front end design

 -  Routes and Controllers in separate folders
    This GET API as originally written below contains both the route and the controller (ie handler for the route):-
        app.get('/tasks', (req, res) => {
            res.json({
                status: 'Success',
                data: TASKS
            })
        })

    This part is the route....
        app.get('/tasks'

    This part is the controller which is a callback function or handler for that particular route
        (req, res) => {
            res.json({
                status: 'Success',
                data: TASKS
            })
        }

    




 */