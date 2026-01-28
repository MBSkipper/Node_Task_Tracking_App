const express = require('express')

const app = express()

/*In app data provided in an array as no database is attached */
const TASKS = [
    {
        id: 1,
        title: 'Select the lunch menu',
        completed: true
    },
    {
        id: 2,
        title: 'Shop for ingredients',
        completed: false
    },
    {
        id: 3,
        title: 'Send out lunch invitations',
        completed: true
    },
    {
        id: 4,
        title: 'Cook the starter and main course',
        completed: false
    },
    {
        id: 5,
        title: 'Cook the dessert and freeze it',
        completed: false
    },
    {
        id: 5,
        title: 'Defrost the dessert',
        completed: false
    },
    {
        id: 6,
        title: 'Host the lunch',
        completed: false
    },
    {
        id: 7,
        title: 'Clear up',
        completed: false
    },
    {
        id: 8,
        title: 'Set up tables and chairs',
        completed: false
    }
]

app.get('/', (req, res) => {
    res.json({
        status: 'OK. App is running',
        now: new Date()
    })
})

/* Note no fetch method required because data is in app in TASKS array above not in a database */
app.get('/tasks', (req, res) => {
    res.json({
        status: 'Success',
        data: TASKS
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
    1. GET/tasks - Returns list of all tasks
    2. POST/tasks - Creates a new task
    3. PATCH/tasks/id - Update an existing task
    4. DELETE/tasks/id - Delete an existing task


 */