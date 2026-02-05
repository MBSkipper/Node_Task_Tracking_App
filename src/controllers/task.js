let TASKS = [
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
        id: 6,
        text: 'Defrost the dessert',
        completed: false
    },
    {
        id: 7,
        text: 'Host the lunch',
        completed: false
    },
    {
        id: 8,
        text: 'Clear up',
        completed: false
    },
    {
        id: 9,
        text: 'Set up tables and chairs',
        completed: false
    }
]

let taskCounter = 10

/**GET - gets a list of tasks*/
const getTasks = (req, res) => {
    res.json({
        status: 'Success',
        data: TASKS
    })
}

/**POST creates a new task*/
const createTask = (req, res) => {
    
    const { text } = req.body 

    const newTask = {
        id: taskCounter++, 
        text,
        completed: false 
    }
    TASKS.push(newTask)

     res.json({           
        status: 'SUCCESS',
        message: 'Task added successfully!'
     })
}
/**PATCH - updates a task */
const updateTask = (req, res) => {
    const { id } = req.params //ensure params is plural!!
    const { text, completed } = req.body 

    let existingTask = TASKS.find(t => t.id == id)
    if(!existingTask) {
        return res.status(404).json({
            status: 'FAILED',
            message: 'Task not found'
        })
    }

    if (text) {
        existingTask.text = text
    }

    if(completed != undefined) {
        existingTask.completed = completed == 'false' ? false : true
    }

     res.json({           
        status: 'SUCCESS',
        message: 'Task updated successfully!'
     })
}

/**DELETE - deletes a task*/
const deleteTask = (req, res) => {
    const { id } = req.params //ensure params is plural!!

    let existingTask = TASKS.find(t => t.id == id)
    if(!existingTask) {
        return res.status(404).json({
            status: 'FAILED',
            message: 'Task not found'
        })
    } 

    TASKS = TASKS.filter(t => t.id != id)

     res.json({           
        status: 'SUCCESS',
        message: 'Task deleted successfully!'
     })
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}

/*
NOTES 
Line 1 - /* DATA ARRAY - In app data provided in an array as no database is attached. Note it is declared with 'let' so that Postman requests will work.  Normally data would be provided in a database and attached in a Model file within the src file.  This model file would be accessible in index.js as well as route and controller files
Line 49 - let taskCounter = 9 - initial value = 9 as there are already 8 tasks in the tasks array

Line 62 - const { text } = req.body //request - this gets a list of tasks
Line 64 - 68 - const newTask = {
        id: taskCounter++, //increments onwards from 8 existing tasks plus any new ones added
        text,
        completed: false //default value
Line 69 - TASKS.push(newTask) pushes the newly created task into the TASKS array

Line 71 - 74 - res.json({           //response to client
        status: 'SUCCESS',
        message: 'Task added successfully!'
     })
Line 78 - const { id } = req.params - this destructured variable has access to the id via req.params.  Ensure params is plural or this will not work

Line 81 - let existingTask = TASKS.find(t => t.id == id) finds id for const id on line 78.  The == will enable type convertion from number to string as this is not strict equality.  Eg it will check for say, string '5' against numerical 5 in the data array.  An alternative would be to write  code as let existingTask = TASKS.find(t => t.id === Number(id)
Line 82 - 87 If the task is not found the status code 404 is sent along with the json() response message
Line 89 - 91 - checks that there is no falsy value ie null, undefined, or '' and then ensures the existing text field is replaced with the updated text field

Line 93 - 95 - here completed is a boolean value, so to avoid the default false value being misinterpreted, this is a hard check to ensure the value is not undefined, so whatever is the value of completed given then enable the value to be updated.  Also there is a check to ensure that the string 'false' is converted to boolean false.Remember a non empty string is always true so even string "false" would be interpreted as true.

Line 115 - this filters out the task with the id that you want removed and presents an array that excludes it

Lines 123 - 128 - note that we are using common module JS system below for exporting modules

*/

