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

app.use(express.json());  // with out this cannot destructure property 'text' of req.body IMPORTANT put this in the code this before the routes

app.use(express.urlencoded( {extended: false} )) // express.urlencoded() is middleware that is required because in POST API cannot directly access req.body in express (line 83).  It is set to {extended: false} because we are not using complex data

/* DATA ARRAY - In app data provided in an array as no database is attached */
const TASKS = [
    {
        id: 1,
        text: 'Select the lunch menu',
        completed: true
    },
    {
        id: 2,
        text: 'Shop for ingredients',
        completed: false
    },
    {
        id: 3,
        text: 'Send out lunch invitations',
        completed: true
    },
    {
        id: 4,
        text: 'Cook the starter and main course',
        completed: false
    },
    {
        id: 5,
        text: 'Cook the dessert and freeze it',
        completed: false
    },
    {
        id: 5,
        text: 'Defrost the dessert',
        completed: false
    },
    {
        id: 6,
        text: 'Host the lunch',
        completed: false
    },
    {
        id: 7,
        text: 'Clear up',
        completed: false
    },
    {
        id: 8,
        text: 'Set up tables and chairs',
        completed: false
    }
]

let taskCounter = 9 //initial value = 9 as there are already 8 tasks in the tasks array

app.get('/', (req, res) => {
    res.json({
        status: 'OK. App is running',
        now: new Date()
    })
})

/* Note no fetch method required because data is in app in TASKS array above not in a database */
/*GET API*/
app.get('/tasks', (req, res) => {
    res.json({
        status: 'Success',
        data: TASKS
    })
})

/*POST API*/
app.post('/tasks', (req, res) => {
    
    const { text } = req.body //request - this gets a list of tasks

    const newTask = {
        id: taskCounter++, //increments onwards from 8 existing tasks plus any new ones added
        text,
        completed: false //default value
    }
    TASKS.push(newTask)

     res.json({           //response to client
        status: 'SUCCESS',
        message: 'Task added successfully!'
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



 */