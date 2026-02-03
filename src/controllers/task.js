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

/**GET - gets a list of tasks*/
const getTasks = (req, res) => {
    res.json({
        status: 'Success',
        data: TASKS
    })
}


/**POST creates a new task*/
const createTask = (req, res) => {
    
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
}

//using common module JS system below for exporting modules
module.exports = {
    getTasks,
    createTask
}